import Link from "next/link";

export default function SideBar() {
  return (
    <div className="ec-shop-leftside ec-vendor-sidebar col-lg-3 col-md-12">
      <div className="ec-sidebar-wrap">
        <div className="ec-sidebar-block">
          <div className="ec-vendor-block">
            <div className="ec-vendor-block-items">
              <ul>
                <li>
                  <Link href="/UserProfile">Meus Dados</Link>
                </li>
                <li>
                  <Link href="/UserHistory">Meus Pedidos</Link>
                </li>
                <li>
                  <Link href="/ShoppingCart">Carrinho de Compras</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
