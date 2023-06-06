import { Connection, Client } from '@temporalio/client';
import { nanoid } from 'nanoid';
import {statusWorkflow} from "./workflows";

async function run() {
  const connection = await Connection.connect();

  const client = new Client({
    connection,
  });

  const handle = await client.workflow.start(statusWorkflow, {
    // type inference works! args: [name: string]
    args: ['/Users/bitovi/Documents/GitHub/chat-gpt-fine-tuning-example/src/data.jsonl'],
    taskQueue: 'status-task-queue',
    workflowId: 'workflow-' + nanoid(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result()); // Hello, Temporal!
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
