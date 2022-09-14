import React from 'react';
import './Ner.css'
import DocumentTags from "../../repository/DocumentTags";

import foodOn from '../../repository/foodon'
import snomedCT from "../../repository/snomed-ct";
import hansard from "../../repository/hansard";
import dsNamespaces from '../../repository/ds-namespaces'

class Ner extends React.Component {

    // addTag(word, tag), removeTag(word), undoRemoveTag(word), updateTag(word, tag)

    constructor(props) {
        super(props)
        this.state = {
            selected: -1,
            added: [],
            allTags: []
        }

    }

    componentDidMount() {

        this.setState({
            allTags: DocumentTags.allTags()
        });
        this.fetchData();
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.recipeId !== prevProps.recipeId) {
            this.fetchData();
        }
    }

    fetchData = () => {
        DocumentTags.loadTags(this.props.recipeId).then((response) => {
            this.setState({
                'nerData': response.data,
                selected: -1
            });
        });
    }

    render() {

        console.log(this.state)
        if (this.state.nerData) {

            const charsForDisplay = this.calculateCharDisplay();

            const mapping = charsForDisplay.mapping
                .filter(e => !e.removed)
                .map(this.visualizeEntityAnnotations);
            const forUpdate = this.state.added.map(this.visualizeEntityAnnotations);

            return (
                <div className="row space-top space-bottom">
                    <div className="col-md-12 entities-list">
                        <h3>Recognized Entities for recipe <b>{this.props.recipeId}</b></h3>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="entities-sentences">
                                <div className="col-md-12 text-justify mt-3 mb-5">
                                    {charsForDisplay.display}
                                </div>
                                <div className="col-md-12">
                                    <h4>Entity tags</h4>
                                    <table className="table table-striped">
                                        <tr>
                                            <th>Entity</th>
                                            <th>Synonyms</th>
                                            <th>Hansard Tags</th>
                                            <th>Hansard Parent</th>
                                            <th>Hansard Closest</th>
                                            <th>FoodOn</th>
                                            <th>SnomedCT</th>
                                            <th>OF</th>
                                        </tr>
                                        {mapping}
                                        {forUpdate}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row space-top space-bottom">
                    <div className="col-md-12 entities-list">
                        <h3>Please choose recipe</h3>
                    </div>
                </div>
            );
        }
    }


    calculateCharDisplay = () => {
        const charsForDisplay = [];
        const nerData = this.state.nerData;
        const curated = nerData.curated;
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
            <span className="ner-char clickable" onClick={() => this.annotationCandidate(token)}>{token.word}</span>);
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


    visualizeEntityAnnotations = (e, ix) => {

        const curated = this.state.nerData.curated;
        let removeCurated = null;
        let updateTag = e.tag;
        if (!curated) {
            removeCurated = (
                <span title="Remove Tag" onClick={() => this.removeEntity(e)}
                      className="btn btn-danger btn-xs clickable">x</span>);
            updateTag = this.tagSelector(e);
        }
        return (<tr className={this.highlightClass(e.start)} key={ix}>
            <td>
                {e.word}
                {removeCurated}
            </td>
            <td>{e.otherTags?.synonyms?.map((s, i) => (<div key={i}>{s}</div>))}</td>
            <td>{updateTag}</td>
            <td>{this.toLinks([e.otherTags && e.otherTags?.hansardParent])}</td>
            <td>{this.toLinks([e.otherTags && e.otherTags?.hansardClosest])}</td>
            <td>{this.toLinks(e.otherTags?.foodon)}</td>
            <td>{this.toLinks(e.otherTags?.snomedct)}</td>
            <td>{this.toLinks(e.otherTags?.of)}</td>
        </tr>);
    }


    toLinks = (list) => {
        let result = null;
        if (list) {
            result = list.filter(l => l !== null).map((l, i) => (<div key={i}>
                <a href={l} target="_blank">
                    {this.getLabel(l)}
                </a>
            </div>));
        }
        return result;

    }

    getLabel = (link) => {
        if (link.startsWith(dsNamespaces.foodon.url)) {
            const key = link.replace(dsNamespaces.foodon.url, '');
            return foodOn[key] || `${dsNamespaces.foodon.prefix}:${key}`;
        } else if (link.startsWith(dsNamespaces.snomedct.url)) {
            const key = link.replace(dsNamespaces.snomedct.url, '');
            return snomedCT[key] || `${dsNamespaces.snomedct.prefix}:${key}`;
        } else if (link.startsWith(dsNamespaces.of.url)) {
            return link.replace(dsNamespaces.of.url, dsNamespaces.of.prefix + ':');
        } else {
            return hansard[link] || link;
        }
    }


    tagSelector = (token) => {
        const options = this.state.allTags.map((t, ix) => (
            <option key={ix} value={t.tag}>{t.tag} [{t.label}]</option>));
        const tagKey = token.tag.split(" ")[0];
        return (
            <select value={tagKey} className="form-control" onChange={e => this.updateTag(token, e.target.value)}>
                <option>Please select annotation</option>
                {options}
            </select>
        );
    }


    annotationCandidate = (token) => {
        console.log(token)
        this.setState(state => {
            return {added: [...state.added, token]};
        });
    }

    removeEntity = (token) => {
        DocumentTags.removeAnnotation(this.props.recipeId, token.start, token.numTokens).then(res => {
            this.fetchData();
        });
    }

    updateTag = (token, tag) => {
        DocumentTags.updateAnnotation(this.props.recipeId, token.start, token.numTokens, tag).then(res => {
            this.fetchData();
            this.setState(state => {
                const index = state.added.indexOf(token);
                state.added.splice(index, 1);
                return {added: state.added};
            });

        });
    }

}

export default Ner;