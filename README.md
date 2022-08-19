# test-files
Sample API's for file upload & download

Step to test API:
* Need npm install before testing the API's.
* The server will be started on localhost:9090

Upload API:
Request-Type: POST
Sample curl req:
curl --location --request POST '127.0.0.1:9090/upload' \
--form 'input_file=@"/Users/revanth.vs/Downloads/go-starter-kit.zip"'

Download API:
Request-Type: GET
Sample curl req:
curl --location --request GET '127.0.0.1:9090/download?file_name=go-starter-kit.zip'
