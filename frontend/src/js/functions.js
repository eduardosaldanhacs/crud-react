export function formatarReal(valor) {
  if (valor == null || valor === '') return '';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
}