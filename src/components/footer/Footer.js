import { Facebook, Twitter, Instagram } from "../../assets/icon";

function Footer() {
  return (
    <div className="relative">
      <div className="flex justify-between h-14 px-8 mx-auto bg-header text-white items-center absolute inset-x-0 bottom-0 ">
        <p>© All rights are reserved</p>
        <div className="flex gap-6">
          <Facebook />
          <Twitter />
          <Instagram />
        </div>
      </div>
    </div>
  );
}

export default Footer;
