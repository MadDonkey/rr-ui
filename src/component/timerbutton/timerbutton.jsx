var React = require('react'),
    ReactDOM = require('react-dom');


module.exports = React.createClass({
    displayName: 'TimerButton',
    propTypes: {
        onClickHandle: React.PropTypes.func,
        countDownFrom: React.PropTypes.number.isRequired,
        children: React.PropTypes.element.isRequired
    },
    getInitialState: function () {
        return {
            countDown: 0
        }
    },
    componentDidUpdate: function (prevProps,prevStates) {
        ReactDOM.findDOMNode(this).querySelector("[data-countdown]").innerHTML = this.state.countDown;
    },
    onClick: function (evt) {
        var {onClickHandle,countDownFrom} = this.props;

        this.startCountDown(countDownFrom);

        if(onClickHandle){
            evt.preventDefault();
            return onClickHandle();
        }

    },
    startCountDown: function (countDownFrom) {
        var self = this;

        this._timer = setInterval(()=>{
            var countDown = self.state.countDown;

            if(countDown)
                self.setState({countDown: countDown - 1});
            else
                window.clearInterval(self._timer);

        },1000);
    },
    render: function () {
        var {children, ...originProps} = this.props,
            {countDown} = this.state;

        return (
            <button disabled={countDown === 0? false : true} onClick={this.onClick} {...originProps}>{children}</button>
        )
    }
});