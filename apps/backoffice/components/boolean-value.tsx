export default function BooleanValue({
  label,
  value,
}: {
  label: string;
  value: boolean;
}) {
  return (
    <div>
      {label}: {value ? "Si" : "No"}
    </div>
  );
}
