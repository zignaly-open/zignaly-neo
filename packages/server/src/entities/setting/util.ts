import { Setting } from './model';

export async function setConfigValue(
  key: string,
  value: string,
): Promise<void> {
  await Setting.upsert({ key, value });
}

export async function getConfigValue(
  key: string,
  defaultValue?: string,
): Promise<string | null> {
  const record = await Setting.findByPk(key);
  return record?.value ?? defaultValue ?? null;
}
