export const statusLabel = (status: string) => {
  return {
    SEND: "Enviado",
    CREATED: "Creado",
    PAYED: "Pagado",
    REJECTED: "Rechazado",
    TODOS: "Todos",
  }[status];
};

export type StatusLabelProps = {
  status: string;
  color: string;
};

export default function StatusLabel({ status, color }: StatusLabelProps) {
  return (
    <>
      <span
        className={`inline-block w-2 h-2 rounded-full ${color} mr-2`}
      ></span>
      {statusLabel(status)}
    </>
  );
}
