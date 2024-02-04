console.log('Loading function')

import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

const ddbClient = new DynamoDBClient({ region: 'us-west-2' })
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient)

// Define the name of the DDB table to perform the CRUD operations on
const tablename = process.env.TABLE_NAME

/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of 'create,' 'read,' 'update,' 'delete,' or 'echo'
 *   - payload: a JSON object containing the parameters for the table item
 *              to perform the operation on
 */
export const handler = async (event, context) => {
  const operation = event.operation

  try {
    if (operation == 'echo') {
      return event.payload
    } else {
      // Add the table name to the payload for the DDB operations
      event.payload.TableName = tablename

      switch (operation) {
        case 'create':
          await ddbDocClient.send(new PutCommand(event.payload))
          return { message: `successfully added` }
        case 'read':
          let tableItem = await ddbDocClient.send(new GetCommand(event.payload))
          return { data: tableItem.Item }
        case 'update':
          await ddbDocClient.send(new UpdateCommand(event.payload))
          return { message: `successfully updated` }
        case 'delete':
          const response = await ddbDocClient.send(
            new DeleteCommand(event.payload)
          )
          console.log(response)
          return { message: `successfully deleted` }
        default:
          return `Unknown operation: ${operation}`
      }
    }
  } catch (error) {
    return { message: error.message, status: 500 }
  }
}
