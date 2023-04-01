import React, { Component } from "react";
import randomWord from "./randomWord";

const toULS = (s) =>
  [...s]
    .map(
      (c) =>
        ({
          ا: "a",
          ب: "b",
          س: "s",
          د: "d",
          ف: "f",
          گ: "g",
          ى: "i",
          ج: "j",
          ك: "k",
          ل: "l",
          م: "m",
          ن: "n",
          و: "o",
          ۆ: "ö",
          پ: "p",
          ڭ: "ng",
          چ: "c",
          ر: "r",
          ت: "t",
          ۇ: "u",
          ۈ: "ü",
          ۋ: "w",
          ي: "y",
          ز: "z",
          ژ: "zh",
          غ: "gh",
          "؟": "?",
          "ٜ": ".",
          "،": ",",
          ھ: "h",
          خ: "x",
          ق: "q",
          ش: "sh",
          ە: "e",
          ې: "ë",
          ئ: "'",
        }[c])
    )
    .join("")
    .replace(/^'/, "");

export default class App extends Component {
  constructor(props) {
    super(props);

    const [uyghur, meaning] = randomWord();
    const latin = toULS(uyghur).trim();

    this.state = {
      uyghur,
      latin,
      meaning,
      hint: false,
      userAnswer: "",
      counter: 0,
      uls: "",
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userAnswer !== this.state.userAnswer) {
      if (this.state.userAnswer === this.state.latin) {
        const [uyghur, meaning] = randomWord();
        const latin = toULS(uyghur);

        setTimeout(() => {
          this.setState({
            uyghur,
            latin,
            meaning,
            hint: false,
            userAnswer: "",
            counter: this.state.counter + 1,
          });
        }, 500);
      }
    }
  }

  handleChange = (e) => {
    const userAnswer = e.target.value;
    this.setState({ userAnswer });
  };

  handleHover = (e) => {
    const char = e.target.textContent;
    const uls = toULS(char);
    this.setState({ uls });
  };

  handleLeave = (e) => {
    this.setState({ uls: "" });
  };

  handleSpanClick = (e) => {
    const { userAnswer } = this.state;
    const char = e.target.textContent;
    const uls = toULS(char);
    this.setState({ userAnswer: userAnswer + uls });
  };

  render() {
    const { uyghur, latin, meaning, hint, userAnswer, counter, uls } =
      this.state;

    return (
      <React.Fragment>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-lg-7 text-center main-panel">
            <p lang="ug" dir="ltr" className="display-1 my-3 highlight">
              {uyghur.split("").map((char, i) => (
                <span
                  key={i}
                  onPointerEnter={this.handleHover}
                  onTouchStart={this.handleHover}
                  onPointerLeave={this.handleLeave}
                  onTouchEnd={this.handleLeave}
                  onClick={this.handleSpanClick}
                >
                  {char}
                </span>
              ))}
            </p>
            <p lang="zh-CN">{meaning}</p>
            <p className="margin-y-1">
              <input
                type="text"
                className="form-control bg-dark text-light text-center"
                onChange={this.handleChange}
                value={userAnswer}
              />
            </p>
          </div>
        </div>

        <div className="left-panel my-2 pt-2 mx-3">
          <p>Count: {counter}</p>
          {uls && <p>Hover hint: {uls}</p>}
        </div>

        <div className="right-panel my-2 mx-3">
          <input
            type="button"
            className="btn btn-secondary round"
            value="❔"
            onClick={() => this.setState({ hint: !hint })}
          />
          <p className={hint ? "my-2" : "my-2 invisible"}>{latin}</p>
        </div>

        <div className="bottom-panel">
          <p>
            View source code on{" "}
            <a
              href="https://ayaka14732.github.io/uyghur-practice/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </p>
          <p>Please use a browser that supports Arabic script</p>
        </div>
      </React.Fragment>
    );
  }
}
