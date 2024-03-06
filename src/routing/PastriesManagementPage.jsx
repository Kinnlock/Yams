import "./PastriesManagementPage.css"
import { useGetAdminPastriesQuery } from "../storage/game"
const PastriesManagementPage = () => {

    const { data: pastries, error: pastriesError, isLoading: pastriesIsLoading } = useGetAdminPastriesQuery();

    if(pastriesError){
        return(
            <>
                <p>{pastriesError}</p>
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
                                <tr key={pastrie.id}>
                                    <td>{pastrie.name}</td>
                                </tr>
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