##React - Redux based UI components
* author another.nianj@gmail.com
* version 0.0.1
## How to Use
* Clone this repo to your local and run `npm instal` in it
* run `webpack-dev-server --hot --inline`
* open `http://localhost:8080` in your browser

## Component list
* TimerButton  [√]  
  This is a button which will be disabled for specified time  
  API           |   Desc.
              --|--
  countDownFrom |  Number, Start countdown from this number
  autoStart     |  Bool
  stateText     |  String, The text shown before countdown start
  countDownText |  String, The text shown after countdown started
  unitText      |  String, The text shown after countdown
  onClickHandle |  Func, the Handle function for click of this button

* Grid [ ]  
  This is a Grid with sorting, filter and column hidden functionalities   
