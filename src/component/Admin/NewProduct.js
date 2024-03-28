import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ClassIcon from "@mui/icons-material/Class";
import DescriptionIcon from "@mui/icons-material/Description";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import StorageIcon from "@mui/icons-material/Storage";
import { Button } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { db, storage } from "../../fireabse";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import "./newProduct.css";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [Stock, setStock] = useState(0);
  const [productImages, setProductImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const categories = ["Mobile", "Laptop", "Tablet", "Smartwatch"];

  const { user } = useSelector((state) => state.userData);
  const getCompaniesByCategory = (selectedCategory) => {
    switch (selectedCategory) {
      case "Mobile":
        return ["Apple", "Samsung", "Google", "OnePlus"];
      case "Laptop":
        return ["Apple", "Dell", "HP", "Lenovo"];
      case "Tablet":
        return ["Apple", "Samsung", "Amazon", "Microsoft"];
      case "Smartwatch":
        return ["Apple", "Samsung", "Fitbit", "Garmin"];
      default:
        return [];
    }
  };

  const createProductSubmitHandler = async (e) => {
    e.preventDefault();

    const productImagesUrls = [];

    try {
      // Upload each image to Firebase Storage
      for (let i = 0; i < productImages.length; i++) {
        const image = productImages[i];
        const storageRef = ref(storage, `productImages/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        // Wait for the upload task to complete
        await uploadTask;

        // Get the download URL for the uploaded image
        const imageUrl = await getDownloadURL(storageRef);
        productImagesUrls.push(imageUrl);
      }

      // Add product data with image URLs to Firestore
      await addDoc(collection(db, "products"), {
        name: name,
        description: description,
        images: productImagesUrls,
        category: category,
        company: company,
        price: price,
        stock: Stock,
        ownerId: user.uid,
      });

      setName("");
      setDescription("");
      setCategory(""); // Reset category to empty
      setCompany(""); // Reset company to empty
      setPrice(0);
      setStock(0);
      // Preserve produc
      console.log("product created");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const createProductImagesChange = (e) => {
    const files = e.target.files;
    const previews = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        previews.push(event.target.result);
        if (previews.length === files.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(files[i]);
    }
    setProductImages(files);
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <ClassIcon />
              <select onChange={(e) => setCompany(e.target.value)}>
                <option value="">Choose company</option>
                {getCompaniesByCategory(category).map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagePreviews.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button id="createProductBtn" type="submit">
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
