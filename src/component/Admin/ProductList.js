import { DataGrid } from "@mui/x-data-grid";
import React, { Fragment, useEffect } from "react";
import "./productList.css";
// import {
//   clearErrors,
//   getAdminProduct,
//   deleteProduct,
// } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { getAdminProducts } from "../../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";

const ProductList = () => {
  const { products } = useSelector((state) => state.products);
  const {user}=useSelector((state)=>state.userData)
  const dispatch = useDispatch();
  // const deleteProductHandler = (id) => {
  //   dispatch(deleteProduct(id));
  // };

  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    // if (deleteError) {
    //   alert.error(deleteError);
    //   dispatch(clearErrors());
    // }

    // if (isDeleted) {
    //   alert.success("Product Deleted Successfully");
    //   navigate("/admin/dashboard");
    //   dispatch({ type: DELETE_PRODUCT_RESET });
    // }

    dispatch(getAdminProducts(user.uid));
  }, [dispatch]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      // renderCell: (params) => {
      //   return (
      //     <Fragment>
      //       {/* <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
      //         <EditIcon />
      //       </Link> */}

      //       {/* <Button
      //         onClick={() =>
      //           deleteProductHandler(params.getValue(params.id, "id"))
      //         }
      //       >
      //         <DeleteIcon />
      //       </Button> */}
      //     </Fragment>
      //   );
      // },
    },
  ];

  // ];
const rows=[]
    products &&
      products.forEach((item) => {
        console.log('item',item);
        rows.push({
          id: item.id,
          stock: item.stock,
          price: item.price,
          name: item.name,
        });
      });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
