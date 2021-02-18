const INITIALDATABASE = [
    {
        label: 'javascript',
        value: 'console.log("Hello World!");',
        filenameExtensions: 'js'
    },
    {
        label: 'java',
        value: "class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello World!\");\n    }\n}",
        filenameExtensions: 'java'
    },
    {
        label: 'python',
        value: "print(\"Hello World!\")",
        filenameExtensions: 'py'
    },
    {
        label: 'cpp',
        value: '#include <iostream>\n\nusing namespace std;\n\nint main() {\n    cout << "Hello World!";\n    return 0;\n}',
        filenameExtensions: 'cpp'
    },
    {
        label: 'assembly',
        value: 'section .data\n    msg db "Hello World!", 0ah\n\nsection .text\n    global _start\n_start:\n    mov rax, 1\n    mov rdi, 1\n    mov rsi, msg\n    mov rdx, 13\n    syscall\n    mov rax, 60\n    mov rdi, 0\n    syscall',
        filenameExtensions: 'asm'
    },
    {
        label: 'ats',
        value: 'implement main0 () = print"Hello World!\n"',
        filenameExtensions: 'dats'
    },
    {
        label: 'bash',
        value: 'echo Hello World',
        filenameExtensions: 'sh'
    },
    {
        label: 'c',
        value: '#include <stdio.h>\n\nint main(void) {\n    printf("Hello World!\\n");\n    return 0;\n}',
        filenameExtensions: 'c'
    },
    {
        label: 'clojure', value: '(println "Hello World!")', filenameExtensions: 'clj'
    },
    {
        label: 'cobol',
        value: '       IDENTIFICATION DIVISION.\n       PROGRAM-ID. hello.\n\n       PROCEDURE DIVISION.\n           DISPLAY \'Hello World!\'\n           GOBACK\n           .\n',
        filenameExtensions: 'cob'
    },
    {label: 'coffeescript',
        value: 'console.log "Hello World!"',
        filenameExtensions: 'coffee'},
    {
        label: 'crystal',
        value: 'puts "Hello World!"',
        filenameExtensions: 'cr'
    },
    {
        label: 'csharp',
        value: 'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass MainClass {\n    static void Main() {\n        Console.WriteLine("Hello World!");\n    }\n}',
        filenameExtensions: 'cs'
    },
    {
        label: 'd',
        value: 'import std.stdio;\n\nvoid main()\n{\n    writeln("Hello World!");\n}',
        filenameExtensions: 'd'},
    {
        label: 'elixir',
        value: 'IO.puts "Hello World!"',
        filenameExtensions: 'ex'},
    {
        label: 'elm',
        value: 'module Main exposing (main)\n\nimport Html exposing (..)\n\nmain =\n    text "Hello World!"',
        filenameExtensions: 'elm'
    },
    {
        label: 'erlang',
        value: '% escript will ignore the first line\n\nmain(_) ->\n    io:format("Hello World!~n").',
        filenameExtensions: 'erl'
    },
    {
        label: 'fsharp',
        value: 'printfn "Hello World!"',
        filenameExtensions: 'fs'
    },
    {
        label: 'go',
        value: 'package main\n\nimport (\n    "fmt"\n)\n\nfunc main() {\n    fmt.Println("Hello World!")\n}',
        filenameExtensions: 'go'
    },
    {
        label: 'groovy',
        value: 'println "Hello World!"',
        filenameExtensions: 'groovy'
    },
    {
        label: 'haskell',
        value: 'main = putStrLn "Hello World!"',
        filenameExtensions: 'hs'
    },
    {
        label: 'idris',
        value: 'module Main\n\nmain : IO ()\nmain = putStrLn "Hello World!"',
        filenameExtensions: 'idr'
    },
    {
        label: 'julia',
        value: 'println("Hello world!")',
        filenameExtensions: 'jl'
    },
    {
        label: 'kotlin',
        value: 'fun main(args : Array<String>){\n println("Hello World!")\n}',
        filenameExtensions: 'kt'
    },
    {
        label: 'lua',
        value: 'print("Hello World!");',
        filenameExtensions: 'lua'
    },
    {
        label: 'mercury',
        value: ':- module main.\n:- interface.\n:- import_module io.\n\n:- pred main(io::di, io::uo) is det.\n\n:- implementation.\n\nmain(!IO) :-\n\tio.write_string("Hello World!", !IO).',
        filenameExtensions: 'm'
    },
    {
        label: 'nim',
        value: 'echo("Hello World!")',
        filenameExtensions: 'nim'
    },
    {
        label: 'ocaml',
        value: 'print_endline "Hello World!"',
        filenameExtensions: 'ml'
    },
    {
        label: 'perl',
        value: 'print "Hello World!\\n";',
        filenameExtensions: 'pl'
    },
    {
        label: 'php',
        value: '<?php\n\necho "Hello World\\n";',
        filenameExtensions: 'php'
    },
    {
        label: 'raku',
        value: 'say \'Hello World!\';',
        filenameExtensions: 'raku'
    },
    {
        label: 'ruby',
        value: 'puts "Hello World!"',
        filenameExtensions: 'rb'
    },
    {
        label: 'rust',
        value: 'fn main() {\n    println!("Hello World!");\n}',
        filenameExtensions: 'rs'
    },
    {
        label: 'scala',
        value: 'object Main extends App {\n    println("Hello World!")\n}',
        filenameExtensions: 'scala'
    },
    {
        label: 'swift',
        value: 'print("Hello World!")',
        filenameExtensions: 'swift'
    },
    {
        label: 'typescript',
        value: 'const hello : string = "Hello World!"\nconsole.log(hello)',
        filenameExtensions: 'ts'
    }
];
module.exports = INITIALDATABASE;
