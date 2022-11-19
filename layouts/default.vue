<template>
  <div class="h-screen w-screen flex flex-col  overflow-hidden bg-gark-800 color-white">
    <div class="w-full">
      <MyHeader />
    </div>
    <div class="flex items-center justify-center">
      <MyTabs />
    </div>
    <div class="flex-auto flex justify-center mt-5 px-15 overflow-y-scroll ">
      <slot />
    </div>
    <footer class="flex px-30 items-center justify-between h-14 border-t border-grey-700">
      <div class="text-sm text-grey-500">
        Company
      </div>
    </footer>
  </div>
</template>
