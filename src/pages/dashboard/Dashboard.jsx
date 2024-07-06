import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategoryAction } from "../../features/category/categoryAction";

export const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  return <div>Dashboard</div>;
};
