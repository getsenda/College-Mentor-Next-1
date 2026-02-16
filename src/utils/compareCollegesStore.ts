const STORAGE_KEY = "compare_college_ids";

export const compareCollegesStore = {
  getIds(): number[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  addId(id: number): number[] {
    const ids = this.getIds();
    if (!ids.includes(id)) {
      ids.push(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    }
    return ids;
  },

  removeId(id: number): number[] {
    const ids = this.getIds().filter(i => i !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    return ids;
  },

  hasId(id: number): boolean {
    return this.getIds().includes(id);
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
