## Run code

##### Run code with 
```bash
curl --request POST \
     --header 'X-Access-Token: some-secret-token' \
     --header 'Content-type: application/json' \
     --data '{"image": "glot/python:latest", "payload": {"language": "python", "files": [{"name": "main.py", "content": "print(42)"}]}}' \
     --url 'https://<docker-run>/run'
```


## Example data

### Simple example
##### Request
```javascript
{
  "files": [
    {
      "name": "main.py",
      "content": "print(42)"
    }
  ]
}
```

##### Response
```javascript
{
  "stdout": "42\n",
  "stderr": "",
  "error": ""
}
```

### Read from stdin
##### Request
```javascript
{
  "stdin": "42",
  "files": [
    {
      "name": "main.py",
      "content": "print(input('Number from stdin: '))"
    }
  ]
}
```

##### Response
```javascript
{
  "stdout": "Number from stdin: 42\n",
  "stderr": "",
  "error": ""
}
```

### Custom run command
##### Request
```javascript
{
  "command": "bash main.sh 42",
  "files": [
    {
      "name": "main.sh",
      "content": "echo Number from arg: $1"
    }
  ]
}
```

##### Response
```javascript
{
  "stdout": "Number from arg: 42\n",
  "stderr": "",
  "error": ""
}
```
