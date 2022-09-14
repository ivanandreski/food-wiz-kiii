import React, {Component} from 'react';


class Recipes extends Component {

    state = {
        filter: "",
        category: ""
    }

    render() {
        const props = this.props;

        var displayRecipes = props.recipes
            .sort()
            .filter((r) => r.match(this.state.filter) !== null)
            .filter((r) => r.match(this.state.category) !== null)
            .map((r) => (<li key={r}>
                <button className="btn btn-link btn-xs" onClick={() => props.onRecipe(r)}>{r}</button>
            </li>))
        return (
            <ul className="list-unstyled components">
                <p>Recipes</p>
                <p>Currated? <input type="checkbox" defaultChecked={this.props.currated}
                                    onChange={this.props.toggleCurrated}/></p>
                <p>
                    <input type="text"
                           className="form-control"
                           placeholder="Filter recipes"
                           onChange={(e) => this.setFilter(e.target.value)}/>
                </p>
                <p>
                    <select className="form-control" placeholder="Select category"
                            onChange={(e) => this.setCategory(e.target.value)}>
                        <option value="">All categories</option>
                        <option value="^0">Appetizers and snacks</option>
                        <option value="^1">Breakfast and Lunch</option>
                        <option value="^2">Desserts</option>
                        <option value="^3">Drinks</option>
                        <option value="^4">Dinners</option>
                    </select>
                </p>
                {displayRecipes}
            </ul>
        );
    }

    setFilter = (value) => {
        this.setState({
            filter: value
        });
    }

    setCategory = (value) => {
        this.setState({
            category: value
        });
    }

}

export default Recipes;