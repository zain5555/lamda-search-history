import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

const dynamo = DynamoDBDocument.from(new DynamoDB());


const getMaxRecords = async (params, records = []) => {
  const data = await dynamo.scan(params);
  
  if (data['Items'].length > 0) {
    records = [...records, ...data['Items']]
  }

  if (data.LastEvaluatedKey) {
    params.ExclusiveStartKey = data.LastEvaluatedKey
    return await getMaxRecords(params, records)
  } else {
    return allData
  }
}


export async function readRecords(tableName) {

  const params = {
    TableName : tableName,
    ProjectionExpression:'cryptoCoin'
    };

    try {
    const records = await getAllData(params);
    return records;
    } catch (error) {
      console.warn(error);
      throw error;
    }

}