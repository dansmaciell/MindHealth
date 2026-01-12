export async function buscarUnidadesSaude() {

  const json = await response.json();
  return json.data || [];
}
