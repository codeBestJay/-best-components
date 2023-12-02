/* eslint-disable @typescript-eslint/no-explicit-any */
import { TreeSelect } from "antd";
import { useEffect, useState } from "react";

interface StationSelectProps {
  stationSource: any[],
  // resourceCode: string;
  onChange: (value: string, depth: number) => void;
  className?: string;
  stationKey?: string; //站的value对应的key
  selectableCity?: boolean; // 城市是否可选
  placeholder?: string;
  filterCity?: string;
  stationId?: string;
  onLoad?: (data: any[]) => void;
  getAllCity?: (data: { cityCode: string; cityName: string }[]) => void;
  ifHide?: boolean;
  supportCity?: boolean;
}

const StationSelect = (prop: StationSelectProps) => {
  const {
    // filterCity = "",
    // resourceCode,
    className,
    placeholder = "全部",
    stationKey = "id",
    selectableCity = true,
    onChange,
    supportCity = true,
    stationSource = [],
    ...props
  } = prop;
  const [value, setValue] = useState<string>();
  const [treeData, setTreeData] = useState<any[]>();

/**
 * @description 递归平铺树
 * @param arr {Array} 需要平铺的树
 * @param d {number} 需要递归的层级
 * @return {Array} 平铺的数组
 */
const flatDeep = (arr: any[] = [], d = 1, children = "children"): [] => {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val?.[children]) ? [val, ...flatDeep(val?.[children], d - 1, children)] : val),
        [],
      )
    : arr.slice();
};


  const handleChange = (selectVal: any, label: any[], extra: any) => {
    const depth = (extra.allCheckedNodes[0]?.pos?.split("-")?.length ?? 0) - 1;
    let val = selectVal?.value ?? "";
    if (stationKey === "stationName" && depth === 2) {
      val = selectVal?.label;
    }
    if (stationKey === "platformKey" && depth === 2) {
      val = (flatDeep(treeData) as any[])?.find((item) => item.value === selectVal?.value)?.platformKey;
    }
    setValue(selectVal);
    if (typeof onChange === "function") {
      onChange(val, depth);
    }
  };
  const translateData = (stationList: any[]) => {
    function translate(data: any[]) {
      if (!data || !data?.length) {
        return [];
      }
      return data.map((item) => {
        const itemVo: any = {};
        if (item.cityCode) {
          itemVo.title = item.cityName;
          itemVo.value = item.cityCode;
          itemVo.platformKey = item.platformKey;
          itemVo.selectable = selectableCity;
          itemVo.disabled = !supportCity;
        } else {
          itemVo.title = item.stationName;
          itemVo.value = item.id;
          itemVo.platformKey = item.platformKey;
          itemVo.isLeaf = true;
        }
        if (item?.stationList?.length) {
          itemVo.children = translate(item.stationList);
        }
        return itemVo;
      });
    }
    return translate(stationList);
  };

  useEffect(() => {
    if (stationSource) { 
       setTreeData(translateData(stationSource));
    }
   }, [stationSource])


  return (
    <TreeSelect
      showSearch
      style={{ width: '100%' }}
      allowClear
      labelInValue
      treeDefaultExpandAll
      placeholder={placeholder}
      value={value}
      treeData={treeData}
      onChange={handleChange}
      onClear={() => {
        setValue("");
      }}
      {...props}
      treeNodeFilterProp="title"
    />
  );
};

export default StationSelect;
