#!/bin/bash
# Remove variables and state
sed -i 's/const \[reels, setReels\] = useState.*//' src/app/admin/dashboard/page.tsx
sed -i 's/const \[activeTab, setActiveTab\].*/const [activeTab, setActiveTab] = useState<"listings" | "edit" | "add">("listings");/' src/app/admin/dashboard/page.tsx
sed -i 's/const \[selectedReel, setSelectedReel\].*//' src/app/admin/dashboard/page.tsx
sed -i 's/const \[reelForm, setReelForm\].*//' src/app/admin/dashboard/page.tsx
sed -i 's/const \[fetchingMeta, setFetchingMeta\].*//' src/app/admin/dashboard/page.tsx
sed -i 's/fetchReels();//' src/app/admin/dashboard/page.tsx

# Remove fetchReels method block
sed -i '/const fetchReels = async () => {/,/  };/d' src/app/admin/dashboard/page.tsx

# Remove handleDeleteReel method block
sed -i '/const handleDeleteReel = async (id: string) => {/,/  };/d' src/app/admin/dashboard/page.tsx

# Remove handleEditReelClick method block
sed -i '/const handleEditReelClick = (reel: Reel) => {/,/  };/d' src/app/admin/dashboard/page.tsx

# Remove handleSaveReelEdit method block
sed -i '/const handleSaveReelEdit = async (e: React.FormEvent) => {/,/  };/d' src/app/admin/dashboard/page.tsx

# Remove handleAddReel method block
sed -i '/const handleAddReel = async (e: React.FormEvent) => {/,/  };/d' src/app/admin/dashboard/page.tsx

# Remove handleAutoFetchReelMeta method block
sed -i '/const handleAutoFetchReelMeta = async () => {/,/  };/d' src/app/admin/dashboard/page.tsx

# Remove filteredReels variable
sed -i '/const filteredReels = filterVertical === '"'"'all'"'"'/,/  : reels.filter(r => r.vertical === filterVertical);/d' src/app/admin/dashboard/page.tsx

# Remove Reels tab button (and associated logic)
sed -i '/onClick={() => setActiveTab('"'"'reels'"'"')}/,/Instagram Reels ({filteredReels.length})/d' src/app/admin/dashboard/page.tsx
sed -i '/<button/d' src/app/admin/dashboard/page.tsx # careful this might delete other buttons
