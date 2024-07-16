import {Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import NotFound from "./Layout/NotFound";

function RootRoutes(){
    return(
        <Routes>
            <Route path='/' element={<Layout />}></Route>
            <Route path='*' element={<NotFound />}></Route>
        </Routes>
    )
}

export default RootRoutes