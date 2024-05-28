<template>
  <header>
    <div>
      <ul class="flex justify-end gap-2 m-5 items-center">
        <li>
          <NuxtLink to="/about"
            ><Button label="About" severity="secondary"
          /></NuxtLink>
        </li>
        <li>
          <NuxtLink to="/contact"
            ><Button label="Contact" severity="secondary"
          /></NuxtLink>
        </li>
        <li>
          <NuxtLink to="/map"
            ><Button label="Map" severity="secondary"
          /></NuxtLink>
        </li>
        <li>
          <NuxtLink to="/map2">
            <Button label="map 2" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            <Button label="Home" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>
