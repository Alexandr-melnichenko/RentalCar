import style from "./LoadMoreBtn.module.css";

export const LoadMoreBtn = ({ onClick, isLoading }) => {
  return (
    <div className={style.btnBox}>
      <button
        onClick={onClick}
        disabled={isLoading}
        className={style.btnLoadMore}
      >
        {isLoading ? "Loading..." : "Load more"}
      </button>
    </div>
  );
};
