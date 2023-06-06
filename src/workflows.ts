import * as wf from '@temporalio/workflow'
import { proxyActivities } from '@temporalio/workflow';
import type * as activities from "./activities";
// import {createFineTune, uploadFile} from "./activities";

const { getStatus } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 s',
});

export async function statusWorkflow(filePath: string): Promise<string> {
  // await uploadFile(filePath);
  // await createFineTune();
  await getStatus();
  while (await getStatus() === 'pending') {
    await wf.sleep(10000);
    await getStatus();
  }
  return 'Model fine tuning is complete'
}