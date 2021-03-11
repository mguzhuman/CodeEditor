import React from "react";
import {Controlled as CodeMirror} from "react-codemirror2";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/python/python');
require('codemirror/mode/clike/clike');
require('codemirror/mode/cobol/cobol');
require('codemirror/mode/coffeescript/coffeescript');
require('codemirror/mode/crystal/crystal');
require('codemirror/mode/d/d');
require('codemirror-mode-elixir');
require('codemirror/mode/elm/elm');
require('codemirror/mode/erlang/erlang');
require('codemirror/mode/mllike/mllike');
require('codemirror/mode/go/go');
require('codemirror/mode/groovy/groovy');
require('codemirror/mode/haskell/haskell');
require('codemirror/mode/julia/julia');
require('codemirror/mode/lua/lua');
require('codemirror/mode/perl/perl');
require('codemirror/mode/php/php');
require('codemirror/mode/ruby/ruby');
require('codemirror/mode/rust/rust');
require('codemirror/mode/swift/swift');


export const CodeComponent = ({
                                  classes,
                                  value,
                                  options = {theme: 'monokai'},
                                  onBeforeChange = (editor, data, value) => {
                                  }
                              }) => {
    return (
        <CodeMirror
            className={classes.fullPage}
            value={value}
            options={options}
            onBeforeChange={onBeforeChange}
        />
    )
}
