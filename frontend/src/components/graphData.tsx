import React from "react";

type Skill = {
  id: number;
  parentId: number;
  name: String;
  type: string;
  usageFrequency: number;
  imageURL?: string;
  level?: number;
};

const graphData: Skill[] = [
  {
    id: 1,
    name: "Frontend \nDevelopment",
    type: "Category Label",
    parentId: 0,
    usageFrequency: 10,
  },
  {
    id: 2,
    name: "Backend \nDevelopment",
    type: "Category Label",
    parentId: 0,
    usageFrequency: 10,
  },
  {
    id: 3,
    name: "Artificial \nIntelligence",
    type: "Category Label",
    parentId: 0,
    usageFrequency: 10,
  },
  {
    id: 4,
    name: "Coding \nLanguages",
    type: "Category Label",
    parentId: 0,
    usageFrequency: 10,
  },
  {
    id: 5,
    name: "Web \nDevelopment",
    type: "Subcategory Label",
    parentId: 1,
    usageFrequency: 10,
  },
  {
    id: 6,
    name: "Mobile \nDevelopment",
    type: "Subcategory Label",
    parentId: 1,
    usageFrequency: 10,
  },
  {
    id: 7,
    name: "Software \nDevelopment",
    type: "Subcategory Label",
    parentId: 1,
    usageFrequency: 10,
  },
  {
    id: 8,
    name: "Game \nDevelopment",
    type: "Category Label",
    parentId: 0,
    usageFrequency: 10,
  },
  {
    id: 9,
    name: "Database \nSystem",
    type: "Subcategory Label",
    parentId: 2,
    usageFrequency: 10,
  },
  {
    id: 10,
    name: "Server \nDevelopment",
    type: "Subcategory Label",
    parentId: 2,
    usageFrequency: 10,
  },
  {
    id: 11,
    name: "Python",
    type: "Image",
    imageURL: "https://image.pngaaa.com/138/619138-middle.png",
    parentId: 4,
    usageFrequency: 10,
  },
  {
    id: 12,
    name: "Javascript",
    type: "Image",
    imageURL:
      "data:image/png;base64,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",
    parentId: 4,
    usageFrequency: 10,
  },
  {
    id: 13,
    name: "Java",
    type: "Image",
    imageURL:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAwFBMVEX////KMTIxdLnJKCnIHyDx0dHHGRrJLC3Yd3ctcrjIJSbKLzApcLckbrfej48ebLbptbbGEBISaLT2+fzHGxz9+Pj78PCFp9HHExWfudrUZmbGCQz88/OVstbT3+7swMD24OC3yuNGgL/f6PNvmcrK2Oq7zeTDAADOR0j13t746OhOhcHq8Pd5n83RU1TMOzzbgYHlqKjim5xmk8fejI3SWFnXcnLuyMgAXrBbjMSswt/TYGHbgIHqubprlsnPS0sXHKrTAAANrUlEQVR4nO1daXuiPBSVXbZS44ZFXHCrVWvVqtV27P//V28W0IDaOqO8YB7Oh5kpGJ+cJrn33JtMbi6XIUOGDBkyZMiQ4Uo0k+5A7JDek+5B3KgPXpLuQtwQv5LuQdx4dspJdyFmLO0/SXchZnwyP01fheekuxAzprqYdBdiRkm32TY1LZsr1JPuRKx4FDnGx3Al6ELSfYgVZVtXXpPuRKyYiZzGtvbmdK7EdAD1WOL0AsuGpqzpnLBKuhdxIq9xnC0l3YsY0SxwnMKyKn2xdTiE66S7ER/KUwUOIcvO8FvgOM5pJd2N+LCEVoYTH5LuRnzABBk2M+VnRFC3mc0kvnBoDXIOs3pNKimIoDxPuiNx4dHREUExf/ItAxP3zUb8OO3pxDvpa373Orz+KhKCy6NX0ttgef8jKGnYxnBilGBlPh0IDCi4GVmCnBiZotLKKTkseP8VWYKcHE7kN79tQXxuJdOnW6KC3Tx09E7ITTSnsqI4LHgO3wtyeoHebJKeZYVjYgADL8gJyvDwsPJUUOCYMpFtmwc25pVyeDMbWlalxIAJzeW+ZN/GUEKmvpQha+25kly3bodViRAsUAZFEpFrlNlIteVFn+Ds8IysywILTjCXe5ePCc6d6JM7xqzgr0Fqis7xM5sFL5jLDR1CUKOMzCN+JjLhJfDmCxfJybTwGmQlk/hArEwoJ4MypVDbMOEmcnXb9/TUkpth0hobi9BnA2cq9UzEpG1GDii8ErktPh4ePWLSymdynbopSni8QqeClpi0xoavz1VIzCtQnqJMHolsOPvci0+HCgmHROGwMoZ1wtCmYsI1UeHMrEPlyG42fesq331mlGCFs4f0wS5/DJlZiH/wiNmUfPHXIcfKaa8yiuM5mVqHvi0Ny5x7xrsWsaWBCIDC9P5z+AgVFEcIdArYF3LQnH4n1qubAgUXukY9qPgRMTvzVIeDGDqelxcCig4bB6IkJxLtvjgBQ11PrFc3xbsYOb72rgUUtdMbwXeHVyFysETQ9/N0eK7RXaEOGZVoCSPt56lwarP7DjEs6HqJjunnckCRlQO0aycyWk/BUpTZMKc4Qxr+T2pTX9mIzPzXtVlBl+n04UuQhGOGYW5eEEIHMB40tmZpDlEs0SrNT+GwYmkw5oXQgVmcc2PFW/iYDWi/j5VNgaFJivA4oLcQNeaGEKI5ONhTaGp0kZHUPoX1YdA+FZ2R6CkMqeX/o2zr5w4JF9uTEW/wo2r//+rVv2HcaNeqbu/c65l4hmBx8TFabFRgqKYF3Ni6dx3GfXdjfYBde3z+M+I5X99u4L86E6DyvGk0YujflWi4HgDAqp4dPYzV7yeFOnCm8jxI2VTtuCowDbD4mR6coxedUvAwxc4N+nUr9EfAVHmw+7VPw8tC+6IFJ6rqXd2vW2HLow7xVvufv6ETXXRbE31hSuZpQ7V4BHX0D42LnX5twvNHv5si+k5jcYPuXY8x4H2YbvHiVsVOr+12RwawLGCcGqoNmqbW7bp5BcbA2FMEo2q71znDszjuNHrtrVvtjuAngWWahmGc9XwTbGsu/5XFifECGlGVcFRRl4Fl8N5ms1jsdrvFYrMZjTzegI/hCwvzQsODP2ksaue8XpoYQo7bHZxusOvBYKqIwR4q+jF4A5mZcGaa3qTW+0EW5EbpmaU+xr1adcNb/jiZBgUTkkK00EvVW1Rr/cZP3AhSZGnCKOK1VnOr1cmkizGZVKtubdvu9xrnVugJ9K3r3E/6gSepkXQvYgQZwm3S3YgPRSgBeWOTdDfOone1jR8ZyOqmxVVEUKxZv4UXv6JrokX4u71NBDULVK/9jglchAafToJFz1LN2pVfsoAErTR6QoQNWj/GRbO006t1+RO2ZOyZvAHSakWLH1iYAc89r1qK4wYMKjwLqTw4F6OytAfVENilc4YijIgyVZHyBIa36UI1U9tu2+32Fumc7sZDQYW1F+rwtzEJsZkAA2xSmILaozgCQd+xyN5LUvSnSUR4CEYoOuypAOzSzA+h7QEjwuI0cPTET6i043jzwdfSOz8PQDlFtMbOUkPcLKAu3FD0NJ6AatqH7wAYSe2QLaHDKNPwAyhj1HXbjSO9UktT6vBCjBt9ZF5IFIVDqPZfBVAZMmS4Eowvt+J2wTZDF4D78Wz/gCIPg4PJrx+7Q/cXYIHkjGFW+2dcH96L8QDw7nac/fACamrL8BZVF2dKIXpoz2KCksYktlDTHUT8ABfQEpRoNR9mOLgwwOjqlE4imAD+Qqjmh3cPwcQRerx1PrSgwifLvKNoIoL+5rDhdhKGCfhfzmykHeNt18QmJcxT5Q0S+W7vyls0ttD6f3zwk8ic6/TdrmeQjVELx4bAhNZ1exwcphnj7QJtC3bbZ8cEb24jNDrjS6l1UjPCcL3BoenefkGp6VijW9UyVPAXBzAuh6fG8KV/i76KjwnF4s/aIAXHobo4M3r9PtMpwOAk+YU4Molf+z2I+Ft0XAt4yRPcWoHrvmkSd9yv8gAYadiXca29EzeB516/6wtjKndhAOh5RtQBjGJynhNtFNIKE/C7H/abfvqiTq9dm2wMnD62wCg8IxLdyd96MP47aDKSqje9zQQGhNi5nz3dhhQAzhXvRuSEEc6LW0DtRs5O967ebL0S43aV/O5p8WkEyXv4Ampvz/NGBPBfSHDTx9tIO/zMqx6Jos4iDS4Dn8t3JyMDD0VUZ6v4QNsePB96jQ+4ATS9Tyk+pJa8NOlXvJyqCy9ysE2lpjE+y7ffnzF5NJ97p71Co2pYBtj9zxwuRTFYZZPuYkPmJgKcrZtFd4JOuPV7jR8k+Lg/gfRUi0/JCejbotOvIvvFG8Bj7swecocbFDLDENkyo4FmStA5lyD9GdTRDBU71hQnN8auZ42g+ej/vg0Ko2K4WP3sKeGG7Oqo2k976q3Yg9LrAwIA1cOWpeq6NQLXRcdqd5sRbxJ3iQwuSqhC02p5XbefvNq+FHBNbX29EoYVAj7wvulediY6pcAZmj46LEQGsIpGFB0havdx1ibp/mXIkCFDhgwZLsDLEIOlS1giWDk2xIDF+x98kDsCWboqKIqM4f0jY3j/yBjePzKG94/TDCtDab2WWv+k5eot1DY9OvCIYXn98Craslwqybb9Pd9fJTT7fIL4DF82Tx4u962l+adm26Tt9KGFn/15W89eErw2OsKw+WSXNGV/i64i7ivjSY6AMA21ftLQswG5u3ydL8lUW11zVngg58PVLC0MK07pcEdwcGt3cDE5qS9TaNGtpzq3v+5bk4/aagqaArNhc5ZgnYHwGOIR0BVBE0Ut6K/ml7J4w58M1UQo49t2/VoXn8pxWyU85IkgzDAvKKItvn7NZ7N5XidVZjibXMxG6j6ErvZu4Ss+/Xolc03RZPk7/wDbvk3l4zJKCSHMcDb4nB1uuWqSiemTInUSOLqSFSnn4d/YLg2+5weDJZF7eENFeJJBmGElfAtbi9ylWyAXQD6RaUpVRpprFOdyuFZCmcxUO3FP+7PHJ9ev+29JpSf6Rk+y9LjTbcnHk69l8jNDCa89/zpkUhVBp2qy4FksnLl6nhQaSr562c8MSS+DiUmKdxwKJYTfHgEbquTLJv0NQ1K84zBmfhWac7VKtLtgWKAZtsg0LQVvsYc8twzvhGE9xJBImMOH8Y/C1+mm6WZYl2YP+afl6ytZeXuG5JpyzZeqxPKIkYtay9Kj31bnUsqwMv8uyFB4KQhciKGEVVowL4m/L9C3JZdnSxu1FfZt08ewnndEvyrAHgdrqREvTmQPXoYhFfdgi0pEfaeO4drGE1FXoH4WSyUxwvBLoHwcqrFDe/Sh7qs8v20qZykp1ayL8vJh9qfZXPu6ZM/QV9/4bnYiuw/RlORghaPZ3++obXMtpNDSDAe4Dq72GMiWStiW7tU3coHYO+r78KiOHbxuH7ICabSlz3gUpgfb8RJhGKhvNDWxnT2IsryGR791+OoUMpRIMWrKrh4xPKjvikMZneDHkIJLIUPs7nQ6LD9iSIjoss/18GHyY4lqm0aGpGQFHSocMfTVt90ikdNhkuI4Sw+VhUohw2MVdsxw5lvXcmFvcjBwtctwOb20MlTocjL1o/iI+AjhDQsa6rPYBOkK/dUpZPiNTSldQzV/lLjwE4jfT+izVKUgogXoqrMkxZE8wxXFkPDR3oJ30lTjjhg++KInYljmpJj1flBflmJKVBvNkLgCrvSFHaK0KgRlq2iG0r4i2T7IwI9J7SDtE6/M4VvQNnmGxIWTWqrlApHNQuH7aSnKAvLgRwzpynkt6rFfxUsoTJ8+BRu3Tcc6JIXE/UzELCgUqwg4RtCma/GI4VdQwzJc13k98B/rCm4riBKS5skzfKYzorm8TQU/igNdI3oQZhjUPObsdeib5g7VVreXdWy5kmdIMvd28OPMFgX0q4fhk/OKFue0JIqDEMPyQMSQo3sSTaEUtLWnKPJf2eJh7yop+DnQQ2fLsydOLtja6wMx/M1HiFaoDX4EcVzk4s9qWirY4vM7kbYS+lTSOe9mJEGIUS5fsYF7Tds4cLwXwRhIvKQX2Ku95aPMkVzK2ZTn3eNbIJb918pGd4rKlPhuh51Km2H8KRGdZSfuk2NCE+fVON1JfIMvNjygIEGQzxTAYwIrUXBWzPoJjOcVG4XDM2TIkCFDhgwZUo//AJI6Kr3uGJaeAAAAAElFTkSuQmCC",
    parentId: 4,
    usageFrequency: 10,
  },
  {
    id: 14,
    name: "C++",
    type: "Image",
    imageURL:
      "https://raw.githubusercontent.com/Benio101/cpp-logo/master/cpp_logo.png",
    parentId: 4,
    usageFrequency: 10,
  },
  {
    id: 15,
    name: "MongoDB",
    type: "Image",
    imageURL:
      "https://toppng.com/uploads/preview/9kib-354x415-unnamed-mongodb-logo-sv-11562860723mgempnmrq3.png",
    parentId: 9,
    usageFrequency: 10,
  },
  {
    id: 16,
    name: "Mysql",
    type: "Image",
    imageURL:
      "https://www.freepnglogos.com/uploads/logo-mysql-png/logo-mysql-mysql-logo-png-images-are-download-crazypng-21.png",
    parentId: 9,
    usageFrequency: 10,
  },
  {
    id: 17,
    name: "Product \nDesign",
    type: "Category",
    parentId: 0,
    usageFrequency: 10,
  },
  {
    id: 18,
    name: "Figma",
    type: "Image",
    imageURL:
      "https://w7.pngwing.com/pngs/718/7/png-transparent-user-interface-design-figma-computer-software-user-experience-design-web-design-user-interface-design-logo.png",
    parentId: 17,
    usageFrequency: 10,
  },
  {
    id: 19,
    name: "Node",
    type: "Image",
    imageURL:
      "https://www.pngfind.com/pngs/m/683-6833893_node-js-logo-png-transparent-png.png",
    parentId: 10,
    usageFrequency: 10,
  },
  {
    id: 20,
    name: "Django",
    type: "Image",
    imageURL:
      "https://w7.pngwing.com/pngs/10/113/png-transparent-django-web-development-web-framework-python-software-framework-django-text-trademark-logo.png",
    parentId: 10,
    usageFrequency: 10,
  },
  {
    id: 21,
    name: "React",
    type: "Image",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png",
    parentId: 5,
    usageFrequency: 10,
  },
];

export default graphData;
