export default function Contador({ quantityRegistered, quantityLogged }: { quantityRegistered: number, quantityLogged: number }) {

    return (
        <div className="flex justify-evenly items-start w-full gap-4">
            <h3>Ingresados: {quantityLogged}</h3>
            <h3>Registrados: {quantityRegistered}</h3>
        </div>
    )
};