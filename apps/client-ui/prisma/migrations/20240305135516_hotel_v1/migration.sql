-- CreateTable
CREATE TABLE `TbChiNhanh` (
    `id` VARCHAR(191) NOT NULL,
    `MaAdmin` VARCHAR(191) NOT NULL,
    `TenChiNhanh` VARCHAR(255) NOT NULL,
    `SDTChiNhanh` VARCHAR(255) NULL,
    `DiaChiChiNhanh` VARCHAR(255) NULL,

    INDEX `MaAdmin`(`MaAdmin`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbChiTietDichVuDatCho` (
    `id` VARCHAR(191) NOT NULL,
    `MaDatCho` VARCHAR(191) NOT NULL,
    `MaDichVu` VARCHAR(191) NULL,
    `MaHoaDon` VARCHAR(191) NULL,
    `MoTa` TEXT NULL,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `MaDatCho`(`MaDatCho`),
    INDEX `MaDichVu`(`MaDichVu`),
    INDEX `MaHoaDon`(`MaHoaDon`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbDatCho` (
    `id` VARCHAR(191) NOT NULL,
    `MaKH` VARCHAR(191) NOT NULL,
    `MaPhong` VARCHAR(191) NOT NULL,
    `NgayDatCho` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `NgayNhanPhong` DATETIME(3) NOT NULL,
    `NgayTraPhong` DATETIME(3) NOT NULL,
    `SLNguoiLonDiKem` INTEGER NOT NULL DEFAULT 1,
    `SLTreEmDiKem` INTEGER NOT NULL DEFAULT 0,
    `LoaiKhach` ENUM('KhachLe', 'KhachTheoNhom') NOT NULL DEFAULT 'KhachLe',
    `StatusThongBao` ENUM('On', 'Off') NOT NULL DEFAULT 'On',
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `MaKH`(`MaKH`),
    INDEX `MaPhong`(`MaPhong`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbDichVu` (
    `id` VARCHAR(191) NOT NULL,
    `MaNhomDichVu` VARCHAR(191) NOT NULL,
    `TenDichVu` VARCHAR(255) NOT NULL,
    `DonViTinh` VARCHAR(255) NULL,
    `GiaVon` DECIMAL(20, 2) NOT NULL,
    `GiaBan` DECIMAL(20, 2) NOT NULL,
    `ThoiLuong` INTEGER NOT NULL,
    `StatusThongBao` ENUM('On', 'Off') NOT NULL DEFAULT 'On',
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `MaNhomDichVu`(`MaNhomDichVu`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbNhomDichVu` (
    `id` VARCHAR(191) NOT NULL,
    `MaKhachSan` VARCHAR(191) NOT NULL,
    `TenNhomDichVu` VARCHAR(255) NOT NULL,

    INDEX `MaKhachSan`(`MaKhachSan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbHangHoa` (
    `id` VARCHAR(191) NOT NULL,
    `MaNhomHangHoa` VARCHAR(191) NOT NULL,
    `TenHangHoa` VARCHAR(255) NOT NULL,
    `DonViTinh` VARCHAR(255) NULL,
    `GiaGocHangHoa` DECIMAL(20, 2) NOT NULL,
    `GiaBanHangHoa` DECIMAL(20, 2) NOT NULL,
    `SLTonKho` INTEGER NOT NULL,
    `DinhMucTonItNhat` INTEGER NULL DEFAULT 0,
    `DinhMucTonNhieuNhat` INTEGER NULL DEFAULT 999999999,
    `TrongLuong` VARCHAR(255) NULL,
    `MoTa` TEXT NULL,
    `GhiChu` TEXT NULL,
    `ViTri` VARCHAR(255) NULL,
    `StatusThongBao` ENUM('On', 'Off') NOT NULL DEFAULT 'On',

    INDEX `MaNhomHangHoa`(`MaNhomHangHoa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbPhieuNhap` (
    `id` VARCHAR(191) NOT NULL,
    `MaKhachSan` VARCHAR(191) NOT NULL,
    `MaNhaCungCap` VARCHAR(191) NULL,
    `CacKhoanChiPhiPhatSinhHangHoa` DECIMAL(20, 2) NULL,
    `TongTienCanTra` DECIMAL(20, 2) NOT NULL,
    `TienDaTra` DECIMAL(20, 2) NOT NULL,
    `Status` ENUM('PhieuTam', 'PhieuHoanThanh') NOT NULL DEFAULT 'PhieuTam',
    `StatusThongBao` ENUM('On', 'Off') NOT NULL DEFAULT 'On',
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `MaNhaCungCap`(`MaNhaCungCap`),
    INDEX `MaKhachSan`(`MaKhachSan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbChiTietNoiDungNhap` (
    `id` VARCHAR(191) NOT NULL,
    `MaHangHoa` VARCHAR(191) NOT NULL,
    `MaPhieuNhap` VARCHAR(191) NOT NULL,
    `ThanhTien` DECIMAL(20, 2) NOT NULL,
    `SLNhap` INTEGER NOT NULL,
    `GiamGia` DECIMAL(20, 2) NULL,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `MaHangHoa`(`MaHangHoa`),
    INDEX `MaPhieuNhap`(`MaPhieuNhap`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbNhomHangHoa` (
    `id` VARCHAR(191) NOT NULL,
    `MaKhachSan` VARCHAR(191) NOT NULL,
    `TenNhomHangHoa` VARCHAR(255) NOT NULL,

    INDEX `MaKhachSan`(`MaKhachSan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbHoaDon` (
    `id` VARCHAR(191) NOT NULL,
    `MaTaiKhoanSub` VARCHAR(191) NULL,
    `MaKhachSan` VARCHAR(191) NOT NULL,
    `TongHoaDon` DECIMAL(20, 2) NULL,
    `KhachThanhToan` DECIMAL(20, 2) NULL,
    `NgayThanhToan` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `GhiChu` TEXT NULL,
    `Status` ENUM('Ready', 'Done', 'Canncel') NOT NULL DEFAULT 'Ready',
    `StatusThongBao` ENUM('On', 'Off') NOT NULL DEFAULT 'Off',
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(3) NOT NULL,
    `PhuongThucThanhToan` ENUM('TienMat', 'ChuyenKhoan') NULL,

    INDEX `MaKhachSan`(`MaKhachSan`),
    INDEX `MaTaiKhoanSub`(`MaTaiKhoanSub`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbKhachHang` (
    `id` VARCHAR(191) NOT NULL,
    `TenKH` VARCHAR(255) NULL,
    `SDTKH` VARCHAR(255) NULL,
    `EmailKH` VARCHAR(255) NOT NULL,
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tbkhachhang_emailkh_unique`(`EmailKH`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbKhachSan` (
    `id` VARCHAR(191) NOT NULL,
    `MaChiNhanh` VARCHAR(191) NOT NULL,
    `TenKhachSan` VARCHAR(255) NOT NULL,
    `DiaChiKhachSan` VARCHAR(255) NULL,
    `SDTKhachSan` VARCHAR(255) NULL,
    `EmailKhachSan` VARCHAR(255) NULL,

    UNIQUE INDEX `tbkhachsan_emailks_unique`(`EmailKhachSan`),
    INDEX `MaChiNhanh`(`MaChiNhanh`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbLoaiPhong` (
    `id` VARCHAR(191) NOT NULL,
    `MaKhachSan` VARCHAR(191) NOT NULL,
    `TenLoaiPhong` VARCHAR(255) NOT NULL,
    `GiaTheoGio` DECIMAL(20, 2) NOT NULL,
    `GiaTheoNgay` DECIMAL(20, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbCacLinkAnhLoaiPhong` (
    `id` VARCHAR(191) NOT NULL,
    `MaLoaiPhong` VARCHAR(191) NOT NULL,
    `LinkAnh` TEXT NOT NULL,

    INDEX `MaLoaiPhong`(`MaLoaiPhong`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbCacLinkAnhDichVu` (
    `id` VARCHAR(191) NOT NULL,
    `MaDichVu` VARCHAR(191) NOT NULL,
    `LinkAnh` TEXT NOT NULL,

    INDEX `MaDichVu`(`MaDichVu`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbCacLinkAnhHangHoa` (
    `id` VARCHAR(191) NOT NULL,
    `MaHangHoa` VARCHAR(191) NOT NULL,
    `LinkAnh` TEXT NOT NULL,

    INDEX `MaHangHoa`(`MaHangHoa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbCacLinkAnhPhong` (
    `id` VARCHAR(191) NOT NULL,
    `MaPhong` VARCHAR(191) NOT NULL,
    `LinkAnh` TEXT NOT NULL,

    INDEX `MaPhong`(`MaPhong`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbNhaCungCap` (
    `id` VARCHAR(191) NOT NULL,
    `TenNhaCungCap` VARCHAR(255) NOT NULL,
    `SDTNhaCungCap` VARCHAR(255) NOT NULL,
    `EmailNhaCungCap` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `tbnhacungcap_emailnhacungcap_unique`(`EmailNhaCungCap`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbPhong` (
    `id` VARCHAR(191) NOT NULL,
    `MaLoaiPhong` VARCHAR(191) NOT NULL,
    `MaNhomKhuVucPhong` VARCHAR(191) NOT NULL,
    `TenPhong` VARCHAR(255) NOT NULL,
    `GhiChu` TEXT NULL,
    `Status` ENUM('Active', 'Paused') NOT NULL DEFAULT 'Active',
    `StatusDatCho` ENUM('DangDonDep', 'PhongTrong', 'DangCoLichDat', 'DangSuDung') NOT NULL DEFAULT 'PhongTrong',
    `StatusThongBao` ENUM('On', 'Off') NOT NULL DEFAULT 'On',
    `createAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updateAt` DATETIME(3) NOT NULL,

    INDEX `MaLoaiPhong`(`MaLoaiPhong`),
    INDEX `MaNhomKhuVucPhong`(`MaNhomKhuVucPhong`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbNhomKhuVucPhong` (
    `id` VARCHAR(191) NOT NULL,
    `MaKhachSan` VARCHAR(191) NOT NULL,
    `TenNhomKhuVuc` VARCHAR(255) NOT NULL,
    `GhiChu` TEXT NULL,

    INDEX `MaKhachSan`(`MaKhachSan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone_number` DOUBLE NULL,
    `address` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `role` ENUM('Admin') NOT NULL DEFAULT 'Admin',

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_email_phone_number_key`(`email`, `phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubUser` (
    `id` VARCHAR(191) NOT NULL,
    `MaKhachSan` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone_number` DOUBLE NULL,
    `address` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `role` ENUM('LeTan', 'PhucVu') NOT NULL,

    UNIQUE INDEX `SubUser_email_key`(`email`),
    INDEX `MaKhachSan`(`MaKhachSan`),
    UNIQUE INDEX `SubUser_email_phone_number_key`(`email`, `phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Avatars` (
    `id` VARCHAR(191) NOT NULL,
    `public_id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Avatars_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubAvatars` (
    `id` VARCHAR(191) NOT NULL,
    `public_id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `subUserId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SubAvatars_subUserId_key`(`subUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TbChiNhanh` ADD CONSTRAINT `user_maadmin_foreign_key_idx` FOREIGN KEY (`MaAdmin`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbChiTietDichVuDatCho` ADD CONSTRAINT `tbchitietdichvudatcho_madatcho_foreign_key_idx` FOREIGN KEY (`MaDatCho`) REFERENCES `TbDatCho`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbChiTietDichVuDatCho` ADD CONSTRAINT `tbchitietdichvudatcho_madichvu_foreign_key_idx` FOREIGN KEY (`MaDichVu`) REFERENCES `TbDichVu`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbChiTietDichVuDatCho` ADD CONSTRAINT `tbchitietdichvudatcho_mahoadon_foreign_key_idx` FOREIGN KEY (`MaHoaDon`) REFERENCES `TbHoaDon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbDatCho` ADD CONSTRAINT `tbdatcho_makhachhang_foreign_key_idx` FOREIGN KEY (`MaKH`) REFERENCES `TbKhachHang`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbDatCho` ADD CONSTRAINT `tbdatcho_makphong_foreign_key_idx` FOREIGN KEY (`MaPhong`) REFERENCES `TbPhong`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbDichVu` ADD CONSTRAINT `tbdichvu_manhomdichvu_foreign_key_idx` FOREIGN KEY (`MaNhomDichVu`) REFERENCES `TbNhomDichVu`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbNhomDichVu` ADD CONSTRAINT `tbnhomdichvu_makhachsan_foreign_key_idx` FOREIGN KEY (`MaKhachSan`) REFERENCES `TbKhachSan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbHangHoa` ADD CONSTRAINT `tbhanghoa_manhomhanghoa_foreign_key_idx` FOREIGN KEY (`MaNhomHangHoa`) REFERENCES `TbNhomHangHoa`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbPhieuNhap` ADD CONSTRAINT `tbphieunhap_manhacungcap_foreign_key_idx` FOREIGN KEY (`MaNhaCungCap`) REFERENCES `TbNhaCungCap`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbPhieuNhap` ADD CONSTRAINT `tbphieunhap_makhachsan_foreign_key_idx` FOREIGN KEY (`MaKhachSan`) REFERENCES `TbKhachSan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbChiTietNoiDungNhap` ADD CONSTRAINT `tbchitietnoidungphieunhap_mahanghoa_foreign_key_idx` FOREIGN KEY (`MaHangHoa`) REFERENCES `TbHangHoa`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbChiTietNoiDungNhap` ADD CONSTRAINT `tbchitietnoidungphieunhap_maphieunhap_foreign_key_idx` FOREIGN KEY (`MaPhieuNhap`) REFERENCES `TbPhieuNhap`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbNhomHangHoa` ADD CONSTRAINT `tbnhomhanghoa_makhachsan_foreign_key_idx` FOREIGN KEY (`MaKhachSan`) REFERENCES `TbKhachSan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbHoaDon` ADD CONSTRAINT `tbhoadon_makhachsan_foreign_key_idx` FOREIGN KEY (`MaKhachSan`) REFERENCES `TbKhachSan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbHoaDon` ADD CONSTRAINT `tbhoadon_mataikhoansub_foreign_key_idx` FOREIGN KEY (`MaTaiKhoanSub`) REFERENCES `SubUser`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbKhachSan` ADD CONSTRAINT `tbkhachsan_machinhanh_foreign_key_idx` FOREIGN KEY (`MaChiNhanh`) REFERENCES `TbChiNhanh`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbCacLinkAnhLoaiPhong` ADD CONSTRAINT `tbcaclinkanh_maloaiphong_foreign_key_idx` FOREIGN KEY (`MaLoaiPhong`) REFERENCES `TbLoaiPhong`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbCacLinkAnhDichVu` ADD CONSTRAINT `tbcaclinkanhhanghoa_madichvu_foreign_key_idx` FOREIGN KEY (`MaDichVu`) REFERENCES `TbDichVu`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbCacLinkAnhHangHoa` ADD CONSTRAINT `tbcaclinkanhhanghoa_mahanghoa_foreign_key_idx` FOREIGN KEY (`MaHangHoa`) REFERENCES `TbHangHoa`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbCacLinkAnhPhong` ADD CONSTRAINT `tbcaclinkanhphong_maphong_foreign_key_idx` FOREIGN KEY (`MaPhong`) REFERENCES `TbPhong`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbPhong` ADD CONSTRAINT `tbphong_manhomkhuvucphong_foreign_key_idx` FOREIGN KEY (`MaNhomKhuVucPhong`) REFERENCES `TbNhomKhuVucPhong`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbPhong` ADD CONSTRAINT `tbphong_maloaiphong_foreign_key_idx` FOREIGN KEY (`MaLoaiPhong`) REFERENCES `TbLoaiPhong`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbNhomKhuVucPhong` ADD CONSTRAINT `tbnhomkhuvucphong_makhachsan_foreign_key_idx` FOREIGN KEY (`MaKhachSan`) REFERENCES `TbKhachSan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `SubUser` ADD CONSTRAINT `tbtaikhoancon_makhachsan_foreign_key_idx` FOREIGN KEY (`MaKhachSan`) REFERENCES `TbKhachSan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Avatars` ADD CONSTRAINT `Avatars_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubAvatars` ADD CONSTRAINT `SubAvatars_subUserId_fkey` FOREIGN KEY (`subUserId`) REFERENCES `SubUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
