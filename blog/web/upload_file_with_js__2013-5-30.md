ajax1.0是无法支持文件上传的post，当然你可以自己创建请求实体内容，但是这基本是不可能的事。ajax2.0 FormData API使使用ajax上传文件成为了可能。

mutilpart/form-data请求头信息

当一个表单既有普通文本又有文件时，就必须把POST请求设置为mutilpart/form-data。请求实体会把特殊的边间字符把请求实体分割为多个部分。

	var file = fileInput.files[0];
	var xhr = new XMLHttpRequest();
	var formDate = new FormData();
	
	xhr.open("POST", "/i/upload");

	//设置formdata数据
	formDate.append("file", fileInput.files[0]);
	formDate.append("name", "jan");

	xhr.send(formDate);

请求头

	Content-Length:18504
	Content-Type:multipart/form-data; boundary=----WebKitFormBoundary3sNT44KjtRir6dPv

主体数据Request Payload为

	------WebKitFormBoundarya3Yr6jLJGIf7NyBL
	Content-Disposition: form-data; name="file"; filename="readme"
	Content-Type: application/octet-stream
	
	
	------WebKitFormBoundarya3Yr6jLJGIf7NyBL
	Content-Disposition: form-data; name="name"
	
	jan
	------WebKitFormBoundarya3Yr6jLJGIf7NyBL--

express 使用req.files获取上传文件信息

ajax2.0的send方法也可以传入Blob对象，而File是Blob的派生类

	var file = fileInput.files[0];
	var xhr = new XMLHttpRequest();

	xhr.open("POST", "/i/upload");
	xhr.send(file);

由于这样发送的信息不是web服务器所能解析，所以这样没有任何意义，除了web服务器能理解浏览器发了什么。

Content-Type若在send之前不设置，那么浏览器自动根据blob的type设置头

	Content-Type:image/png