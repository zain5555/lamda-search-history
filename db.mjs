import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
const dynamo = DynamoDBDocument.from(new DynamoDB());


export async function readRecords(tableName) {

    const params = {
      TableName : tableName,
      ProjectionExpression:['sort_number', 'current_balance','side']
      };
      const allRecords = [];

      try {

        const getAllRecords = async (params) => { 

          console.log("Querying Table");
          let records = await dynamo.query(params).promise();
      
          if(records['Items'].length > 0) {
              allRecords = [...allRecords, ...records['Items']];
          }
      
          if (records.LastEvaluatedKey) {
              params.ExclusiveStartKey = records.LastEvaluatedKey;
              return await getAllRecords(params);
      
          } else {
              return data;
          }
      }

      return allRecords;

      } catch (error) {
        console.warn(error);
        throw error;
      }

}