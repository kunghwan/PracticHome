import { IoClose } from "react-icons/io5";

const SearchResult = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="flex items-center border-b px-4 py-2">
        <input
          autoFocus
          type="text"
          placeholder="검색어를 입력해주세요."
          className="flex-grow outline-none text-base"
        />
        <IoClose
          onClick={onClose}
          className="text-2xl text-gray-500 cursor-pointer"
        />
      </div>

      <div className="p-4 text-sm text-gray-500">
        <p className="mb-2">최근 검색어 내역이 없습니다.</p>
        <div className="flex justify-between text-xs text-gray-400">
          <span>자동저장 끄기 · 도움말</span>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
};
export default SearchResult;
