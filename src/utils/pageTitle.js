import { title, titleReverse, titleSeparator } from "@/config/settings";

/**
 * @author knows 1002563923@qq.com
 * @description 设置标题
 * @param pageTitle
 * @returns {string}
 */
export default function getPageTitle(pageTitle) {
  let newTitles = [];
  if (pageTitle) newTitles.push(pageTitle);
  if (title) newTitles.push(title);
  if (titleReverse) newTitles = newTitles.reverse();
  return newTitles.join(titleSeparator);
}
