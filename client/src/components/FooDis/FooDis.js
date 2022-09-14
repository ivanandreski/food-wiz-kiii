import React, {Component} from 'react';
import Ner from "../Ner/Ner";


class FooDis extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            curated: true
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(oldProps, oldState) {
        if (this.props?.title !== oldProps?.title) {
            this.fetchData();
        }
    }

    render() {
        let tags = null;
        if (this.state.selectedRecipe) {
            tags = <Ner recipeId={this.state.selectedRecipe}/>;
        }
        return (
            <div className="row mt-3 ml-3 mr-3">
                <div id="sidebar " className="col-md-2 nav nav-dark">
                    {this.showFooDis()}
                </div>
                <div className="col-md-9 ">
                    {tags}
                </div>
            </div>
        );
    }

    fetchData = () => {
        const loadFn = this.props.loadFn
        loadFn().then((response) => {
            this.setState({
                'recipes': response.data
            });
        });
    }


    showFooDis() {

        const displayRecipes = this.state.recipes
            .sort()
            .map((r) => (<li key={r}>
                <button className="btn btn-link btn-xs" onClick={() => this.displayRecipe(r)}>{r}</button>
            </li>))
        return (
            <ul className="list-unstyled components">
                {displayRecipes}
            </ul>
        );
    }


    displayRecipe = (recipeId) => {
        this.setState({
            selectedRecipe: recipeId
        });
    }

}

export default FooDis;
