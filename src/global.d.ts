type Nullable<T> = T | null;

type TypeFunction = () => void;

type TypeObject = Record<string, unknown>;

type typeDict = {
  value: string;
  description?: string;
  name?: string;
  label: string;
  code?: string;
  itemName?: string;
};

type typeDictResponse = Record<string, typeDict[]>;

type typePagination = {
  pageSize: number;
  pageNo?: number;
  total?: number;
  pageNum?: number;
};

interface LooseObject {
  [key: string]: any;
}
