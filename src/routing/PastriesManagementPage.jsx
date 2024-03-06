import "./PastriesManagementPage.css"
import { useGetAdminPastriesQuery } from "../storage/game"
const PastriesManagementPage = () {

    const { data: pastries, error: pastriesError, isLoading: pastriesIsLoading } = useGetAdminPastriesQuery();

    if(pastriesError){
        return(
            <>
                <p>{error}</p>
            </>
        )
    }
    if(pastriesIsLoading){
        return(
            <>
                <p>Chargement</p>
            </>
        )
    }
    if(pastries){
        return(
            <>
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastries.map((pastrie)=>(
                            <>
                                <th key={pastrie.id}>
                                    <td>{pastrie.name}</td>
                                </th>
                            </>
                        )
                        )}
                    </tbody>
                </table>
            </>
        )
    }


}

export default PastriesManagementPage