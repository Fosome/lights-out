var Light = React.createClass({displayName: "Light",

    getDefaultProps: function() {
        return {
            id     : null,
            active : false
        };
    },

    render: function() {
        var lightColor = this.props.active ? "yellow" : "gray";

        return (
            React.createElement("div", {className: "col-1-3"}, 
                React.createElement("div", {
                    key:  this.props.id, 
                    onClick:  this.onChange, 
                    style: { border: "1px solid", background: lightColor, width: 100, height: 100, margin: 10}}
                )
            )
        );
    },

    onChange: function(e) {
        this.props.onChange(this.props.id);
    }
});

var LightGrid = React.createClass({displayName: "LightGrid",

    getInitialState: function() {
        return {
            grid: [
                true, false, false,
                false, true, true,
                false, false, true
            ]
        };
    },

    render: function() {
        var lights = this.state.grid.map(
            function(active, index, array) {
                return React.createElement(Light, {id:  index, active:  active, onChange:  this.onLightChange});
            },
            this
        );

        return (
            React.createElement("div", null, 
                React.createElement("h1", null, "Lights Out!"), 

                React.createElement("div", {className: "grid"}, 
                    { lights}
                )
            )
        );
    },

    onLightChange: function(id) {
        this.flipLight(id);
        this.neighbors(id).forEach(this.flipLight);

        this.setState({
            grid: this.state.grid
        });
    },

    flipLight: function(id) {
        this.state.grid[id] = !this.state.grid[id];
    },

    neighbors: function(id) {
        //var total = this.state.grid.length;
        var neighbors = [];

        switch(id) {
            case 0:
                neighbors = [1,3];
                break;
            case 1:
                neighbors = [0,2,4];
                break;
            case 2:
                neighbors = [1,5];
                break;
            case 3:
                neighbors = [0,4,6];
                break;
            case 4:
                neighbors = [1,3,5,7];
                break;
            case 5:
                neighbors = [2,4,8];
                break;
            case 6:
                neighbors = [3,7];
                break;
            case 7:
                neighbors = [4,6,8];
                break;
            case 8:
                neighbors = [5,7];
                break;
        }

        return neighbors;
    }

});

// Entry
React.render(
  React.createElement(LightGrid, null),
  document.getElementById('content')
);
