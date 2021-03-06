import React, { useState } from "react";
import { Dropdown, Input } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import Category from "../../models/category";
import styles from "./Header.module.css";

interface Props {
  categoriesList: Category[];
}

const HeaderCategories = ({ categoriesList }: Props) => {
  const [isActiveDropdownCategories, setActiveDropdown] = useState(false);
  const [searchCategField, setSearchCategField] = useState("");
  const handleDropdownCategories = (status = false) => {
    setActiveDropdown(status);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCategField(event.target.value);
  };
  const searchChange = (list: Category[] = []) => {
    return list.filter((category) => {
      return category.title
        .toLowerCase()
        .includes(searchCategField.toLowerCase());
    });
  };
  const searchedCategories = searchChange(categoriesList);
  const history = useHistory();
  return (
    <Dropdown
      item
      text="Categories"
      onMouseEnter={() => handleDropdownCategories(true)}
      onMouseLeave={() => handleDropdownCategories()}
      open={isActiveDropdownCategories}
    >
      <Dropdown.Menu className={styles.headerDropDown}>
        <Input
          icon="search"
          iconPosition="left"
          value={searchCategField}
          onChange={handleChange}
        />
        <Dropdown.Menu scrolling>
          {searchedCategories.map((category) => (
            <Dropdown.Item
              key={category.id}
              text={category.title}
              onClick={() => history.push(`/category/${category.id}`)}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default HeaderCategories;
