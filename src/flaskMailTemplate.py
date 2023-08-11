mail_template = '''<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }

        .container {
            width: 80%;
            margin: auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            margin-top: 10%;
            text-align: center;
        }

        .header {
            font-size: 2em;
            color: #2c3e50;
            margin-bottom: 50px;
        }

        .content {
            font-size: 1em;
            color: black;
            margin-bottom: 50px;
        }

        #btn {
            background-color: #FF7C33;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            letter-spacing: 1px;
        }
        
        .token {
          font-size: 2em;
          color: black;
        }
        
        .black-font {
          color: black;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
         <div>
    <img src="https://bug-busters-planio-bucket-demostration.s3.eu-west-3.amazonaws.com/planio-logo-png.png" />
    </div>
            Password Recovery
        </div>

        <div class="content">
        <span class="black-font">Hi {{ user_name }},</span>
            <br/>
            <br/>
            <span class="black-font">Your recovery token:</span>
             <br/>
             <br/>
             <span class="token"> {{ recovery_token }}</span>
             <br/>
             <br/>
             <span class="black-font">Click the button below to reset your password.</span>
             
        </div>

        <a id="btn" href="{{ url }}">Reset Password</a>
    </div>
   
</body>
</html>

'''
