
import { useAuth } from "./utils/AuthContext"
const baseURL = "http://43.204.209.147:81/Api"
// const { displayName } = useAuth();

export let PATHS = {

    LOGIN: `${baseURL}/login`,
    // BGUTILIZATIONCHART: `${baseURL}/getBGUtilization?client_Name=${displayName}`,
    // TAXLIABILITYCHART:`${baseURL}/getTaxLiability?client_Name=${displayName}&duration=current`,
    // Form_EX201_Excise_Goods_Customs  
    // Form_EX202A_Enter_Goods_DZ
    // Form_EX202A_Import_DZ
    // Form_EX202A_Production_DZ
    // Form_EX202A_Release_Goods_DZ
    // Form_EX202A_Transfer_Goods_DZ
    // Form_EX203_Deductible
    // Form_EX203B_Lost_Damaged
    // Form_EX203C_Transfer_of_Ownership

    EMARAFORMS: `${baseURL}/getEmaraForms`,
    STOCKBYDECLARATIIONREPORT:`${baseURL}/login`,
    STOCKREPORT:`${baseURL}/StockByDeclaration`,



}