/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { fetchUsers, setData } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../utils/store";
import UserTable from "../Table/UserTable";
import { FormData } from "../utils/type";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users } = useSelector((state: any) => state.users);
  const navigate = useNavigate();

  const fetchData = async () => {
    await dispatch(fetchUsers());
  };
  const onEdit = (id: number) => {
    const filterSingle = users.filter((data: FormData) => data.id === id);

    dispatch(setData(filterSingle[0]));
    navigate("/user");
  };

  const onDelete = (id: number) => {
    console.log(id);
  };
  const onView = (id: number) => {
    const filterSingle = users.filter((data: FormData) => data.id === id);

    dispatch(setData(filterSingle[0]));
    navigate("/resume");
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <UserTable
        users={users}
        onDelete={onDelete}
        onEdit={onEdit}
        onView={onView}
      />
    </>
  );
};

export default AdminPage;
