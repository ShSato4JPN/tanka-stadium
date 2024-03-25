"use client";
import { Puff } from "react-loader-spinner";

import styles from "./style.module.scss";

function Loading() {
  return (
    <div className={styles["wrapper"]}>
      <Puff
        visible={true}
        height="80"
        width="80"
        color="#40c86b"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loading;
