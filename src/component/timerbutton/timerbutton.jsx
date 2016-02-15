var React = require('react');

module.exports = React.createClass({
    displayName: 'TimerButton',
    propTypes: {
        onClickHandle: React.PropTypes.func,
        countDownFrom: React.PropTypes.number.isRequired,
        countDownText: React.PropTypes.string.isRequired,
        stateText: React.PropTypes.string.isRequired,
        unitText: React.PropTypes.string,
        autoStart: React.PropTypes.bool
    },
    getInitialState: function () {
        return {
            countDown: 0
        };
    },
    getDefaultProps: function() {
        return {
            autoStart: false,
            unitText: "Sec."
        };
    },
    componentDidMount: function () {
      var {countDownFrom,autoStart} = this.props;

      if (autoStart) {
        this.startCountDown(countDownFrom);
      }
    },
    componentWillUnmount: function(){
        window.clearInterval(self._timer);
    };
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

        this.setState({countDown: countDownFrom});
        this._timer = setInterval(()=>{
            var countDown = self.state.countDown;
            if(countDown === 0 && self._timer )
                window.clearInterval(self._timer);
            else
                self.setState({countDown: countDown - 1});

        },1000);
    },
    render: function () {
        var {countDownFrom,stateText, countDownText, unitText, ...originProps} = this.props,
            {countDown} = this.state;

        return (
            <button disabled={countDown === 0? false : true} onClick={this.onClick} {...originProps}> {countDown === 0? stateText : countDownText + countDown + unitText}</button>
        );
    }
});
