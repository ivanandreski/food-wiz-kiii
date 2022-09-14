import React from 'react';
import './Predict.css'
import DocumentTags from "../../repository/DocumentTags";

class Predict extends React.Component {

    // addTag(word, tag), removeTag(word), undoRemoveTag(word), updateTag(word, tag)

    constructor(props) {
        super(props)
        this.state = {
            selected: -1,
            models: [],
            text: '',
            selectedModel: '',
            loading: false,
            hansardTags: {}
        }

    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData = () => {
        const ht = {};
        const allTags = DocumentTags.allTags().forEach(t => {
            ht[t.tag] = t.label
        });
        console.log(ht);
        DocumentTags.allModels().then((response) => {
            this.setState({
                'models': response.data,
                selected: -1,
                hansardTags: ht
            });
        });

    }

    doPredict = () => {
        this.setState({
            nerData: null,
            selected: -1,
            loading: true
        });
        DocumentTags.predict(this.state.text, this.state.selectedModel).then((response) => {
            this.setState({
                nerData: response.data,
                loading: false
            });
        }).catch(r => {
            this.setState({
                loading: false
            });
            alert('Something went wrong. Probably a timeout. Please try again');
        });
    }

    render() {

        let loadingDiv = null;
        if (this.state.loading) {
            loadingDiv = (<h4 className="mt-5">Loading (this may take a while)...</h4>);
        }

        const modelOptions = this.state.models
            .map(m => (<option key={m}
                               value={m}>{m}</option>));
        const form = (<div className="row space-top space-bottom pl-5 pr-5">
            <div className="col-md-12 text-center">
                <h3>Free text prediction</h3>
                <div className="form-group">
                        <textarea name="text"
                                  className="form-control"
                                  placeholder="Enter recipe text"
                                  rows="7"
                                  value={this.state.text} onChange={this.updateStateField}/>
                </div>
                <div className="form-group">
                    <select name="selectedModel"
                            className="form-control"
                            value={this.state.selectedModel} onChange={this.updateStateField}>
                        <option>Please select model</option>
                        {modelOptions}
                    </select>
                </div>

                <button className="btn btn-primary" onClick={this.doPredict}>Submit</button>

                {loadingDiv}
            </div>
        </div>);
        if (!this.state.nerData) {
            return form;
        } else if (!this.state.loading) {
            const charsForDisplay = this.calculateCharDisplay();

            const mapping = charsForDisplay.mapping
                .map(this.visualizeEntityAnnotations);

            return (
                <div className="col-md-12">
                    {form}
                    <div className="col-md-12 entities-list mt-3">
                        <h3>Recognized Entities for this text</h3>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="entities-sentences">
                                <div className="col-md-12 text-justify mt-3 mb-5">
                                    {charsForDisplay.display}
                                </div>
                                <div className="col-md-12">
                                    <h4>Entity Annotations</h4>
                                    <table className="table table-striped">
                                        <tr>
                                            <th>Entity</th>
                                            <th>Annotation</th>
                                        </tr>
                                        {mapping}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }


    calculateCharDisplay = () => {
        const charsForDisplay = [];
        const nerData = this.state.nerData;
        const entityMapping = [];


        for (let i = 0; i < nerData.tokens.length; i++) {
            const token = nerData.tokens[i];

            if (token.tag === "O") {
                charsForDisplay.push(this.regularCharDisplay(token));
            } else {
                charsForDisplay.push(this.nerCharDisplay(token))
                entityMapping.push(token);
            }

        }
        return {
            display: charsForDisplay,
            mapping: entityMapping
        };
    }


    regularCharDisplay = (token) => {
        return (
            <span className="ner-char clickable">{token.word}</span>);
    }

    nerCharDisplay = (token) => {

        let badge = token.removed ? 'entity badge badge-danger' : 'entity badge badge-success';
        return (
            <span className={badge} title={token.tag} onMouseEnter={() => this.highlight(token.start)}>
                {token.word}
            </span>
        );
    }

    highlight = (index) => {
        this.setState({
            selected: index
        })
    }


    highlightClass = (num) => {
        if (this.state.selected === num) {
            return "bg-success";
        } else {
            return "";
        }
    }

    updateStateField = (e) => {
        const update = {};
        update[e.target.name] = e.target.value;
        this.setState(update);
    }

    visualizeEntityAnnotations = (e, ix) => {

        let updateTag = e.tag;
        let label = null;
        if (this.state.hansardTags[e.tag]) {
            label = `[${this.state.hansardTags[e.tag]}]`;
        }
        return (<tr className={this.highlightClass(e.start)} key={ix}>
            <td>{e.word}</td>
            <td>{e.tag} {label}</td>
        </tr>);
    }

}

export default Predict;