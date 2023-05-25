import CardLayout from "../../Layout/CardLayout";
import MainLayout from "../../Layout/MainLayout";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <MainLayout>
            <CardLayout>
                <Outlet />
            </CardLayout>
        </MainLayout>
    );
};
export default Dashboard;
