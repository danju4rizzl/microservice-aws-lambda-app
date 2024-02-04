Working with AWS Lambda + ApiGateway + DynamoDB (microservice)

#### prerequisite:

- AWS account.
- We need the [AWS CLI ](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) v2 to run cli commands.

---

To zip your file for lambda use the following command:

```bash
tar -a -c -f function.zip * index.mjs
```

This will create a zip file called function.zip containing the index.mjs

After creating and deploying the lambda function in `index.mjs`, create a new file called `input.txt` and include the following JSON code in the newly created file.

```JSON
{
    "operation": "echo",
    "payload": {
        "somekey1": "somevalue1",
        "somekey2": "somevalue2"
    }
}
```

Next, invoke the lambda function as a test from the `input.txt` file

```bash
aws lambda invoke --function-name LambdaFunctionOverHttps \
--payload file://input.txt outputfile.txt --cli-binary-format raw-in-base64-out
```

This will generate an `output.txt`. Opening the file, you will see the following results:

```JSON
{"somekey1":"somevalue1","somekey2":"somevalue2"}
```

### Testing the API

These are example request body JSON to test your lambda or apigateway endpoints.

_In this example: we've set the resources method as `POST` By doing this all request made to the API must have an `operation` property based on what you want to do eg: `create | read | update | delete`._

**If it is number values you cannot cart with zero's otherwise use use a string.**

---

- Testing create operations

```JSON

{
  "operation": "create",
  "payload": {
    "Item": {
      "id": "32145BCD",
      "company": "Deejaydev",
      "phone": 980123456789
    }
  }
}
```

- Testing update operations

```JSON
{
  "operation": "update",
  "payload": {
    "Key": {
      "id": "32145BCD"
    },
    "AttributeUpdates": {
      "company": {
        "Value": "DeejayDev"
      },
      "phone": {
        "Value": 12345887456
      }
    }
  }
}
```

- Testing delete operations

```JSON
{
  "operation": "delete",
  "payload": {
    "Key": {
      "id": "32145BCD"
    }
  }
}
```

- Testing read operations

```JSON
{
  "operation": "read",
  "payload": {
    "Key": {
      "id": "32145BCD"
    }
  }
}
```

### Cleaning up your resources

https://docs.aws.amazon.com/lambda/latest/dg/services-apigateway-tutorial.html#cleanup

#### To delete the Lambda function

- Open the [Functions page](https://console.aws.amazon.com/lambda/home#/functions) of the Lambda console.

- Select the function that you created.

- Choose Actions, Delete.

- Type delete in the text input field and choose Delete.

#### To delete the execution role

- Open the [Roles page](https://console.aws.amazon.com/iam/home#/roles) of the IAM console.

- Select the execution role that you created.

- Choose Delete.

- Enter the name of the role in the text input field and choose Delete.

#### To delete the API

- Open the [APIs page](https://console.aws.amazon.com/apigateway/main/apis) of the API Gateway console.

- Select the API you created.

- Choose Actions, Delete.

- Choose Delete.

#### To delete the DynamoDB table

- Open the [Tables page](https://console.aws.amazon.com/dynamodb/home#tables:) of the DynamoDB console.

- Select the table you created.

- Choose Delete.

- Enter delete in the text box.

- Choose Delete table.
