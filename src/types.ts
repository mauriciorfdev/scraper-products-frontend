export type FilterMode = 'include' | 'exclude';

export type ThemeMode = 'light' | 'dark';

export type IngredientFilters = {
  search: string;
  filterMode: FilterMode;
};
