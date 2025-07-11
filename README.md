# ケアプランセンターとんとん公式ウェブサイト

株式会社とんとんが運営する居宅介護支援事業所「ケアプランセンターとんとん」の公式ウェブサイトです。

## 📋 プロジェクト概要

### 事業情報
- **事業名**: ケアプランセンターとんとん
- **会社名**: 株式会社とんとん
- **業種**: 介護・居宅介護支援
- **所在地**: 大阪府大阪市東淀川区豊里7-20-1
- **電話番号**: 06-6328-8855

### ウェブサイトの目的
高齢者とそのご家族に安心感と信頼を与える、アクセシブルで使いやすいウェブサイトを提供し、介護サービスに関する情報提供と相談受付を行います。

## 🏗️ 技術仕様

### 使用技術
- **HTML5**: セマンティックタグを活用した構造化マークアップ
- **CSS3**: Flexbox、Grid、カスタムプロパティを使用したモダンな設計
- **JavaScript (ES6+)**: アクセシビリティ対応の双方向機能実装

### 対応ブラウザ
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### レスポンシブ対応
- **モバイル**: 320px〜767px
- **タブレット**: 768px〜1199px
- **デスクトップ**: 1200px以上

## 📂 ファイル構成

```
ton-ton/
├── index.html              # トップページ
├── about.html              # 施設紹介ページ
├── access.html             # アクセスページ
├── contact.html            # お問い合わせページ
├── css/
│   └── style.css          # メインスタイルシート
├── js/
│   ├── main.js            # メイン機能JavaScript
│   └── form.js            # フォーム機能JavaScript
├── images/                 # 画像ディレクトリ
├── favicon.svg             # サイトアイコン
├── sitemap.xml             # サイトマップ
├── robots.txt              # クローラー制御
├── .htaccess              # Apache設定
├── README.md              # このファイル
└── ACCESSIBILITY_TEST_CHECKLIST.md  # アクセシビリティチェックリスト
```

## 🚀 セットアップ・導入手順

### 1. ファイルのアップロード
1. 全ファイルをWebサーバーのドキュメントルートにアップロード
2. ファイルパーミッションを適切に設定（644 for files, 755 for directories）

### 2. サーバー設定
#### Apache サーバーの場合
- `.htaccess`ファイルが自動的に設定を適用
- mod_rewrite、mod_deflate、mod_expiresモジュールの有効化を推奨

#### Nginx サーバーの場合
以下の設定を`nginx.conf`に追加：

```nginx
# Gzip圧縮
gzip on;
gzip_types text/css application/javascript image/svg+xml;

# キャッシュ設定
location ~* \.(css|js|png|jpg|jpeg|gif|svg|ico)$ {
    expires 1M;
    add_header Cache-Control "public, immutable";
}

# セキュリティヘッダー
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```

### 3. DNS・ドメイン設定
1. ドメインのDNS設定でサーバーIPを指定
2. SSL証明書の設定（Let's Encryptまたは商用証明書）
3. HTTPSリダイレクトの有効化

### 4. 設定のカスタマイズ
以下のファイルで本番環境に合わせて設定を変更：

- `sitemap.xml`: URLを実際のドメインに変更
- `robots.txt`: サイトマップURLを実際のドメインに変更
- 各HTMLファイルのOGPタグ: URLを実際のドメインに変更

## 🎨 デザインシステム

### カラーパレット
```css
/* プライマリカラー */
--color-primary: #4a90a4;        /* メインブルー */
--color-primary-light: #6ba5b7;  /* ライトブルー */
--color-primary-dark: #357c8f;   /* ダークブルー */

/* セカンダリカラー */
--color-secondary: #2c5f2f;      /* メイングリーン */
--color-accent: #f4a261;         /* アクセントオレンジ */

/* ニュートラルカラー */
--color-white: #ffffff;
--color-off-white: #fafafa;
--color-cream: #f8f6f0;
--color-gray: #666666;
--color-dark-gray: #333333;
```

### タイポグラフィ
- **フォントファミリー**: Noto Sans JP, ヒラギノ角ゴ, メイリオ
- **ベースフォントサイズ**: 16px (モバイル), 18px (デスクトップ)
- **行間**: 1.6 (基本), 1.8 (読みやすさ重視エリア)

### ブレークポイント
```css
--breakpoint-sm: 480px;   /* 小さいモバイル */
--breakpoint-md: 768px;   /* タブレット */
--breakpoint-lg: 1024px;  /* 小さいデスクトップ */
--breakpoint-xl: 1200px;  /* 大きいデスクトップ */
```

## 🔧 機能説明

### ナビゲーション機能
- **デスクトップ**: 水平メニューバー
- **モバイル**: ハンバーガーメニュー（アクセシブル実装）
- **キーボード操作**: Tab、Enter、Escapeキー対応
- **フォーカス管理**: 開いたメニュー内でのフォーカストラップ

### お問い合わせフォーム
- **リアルタイム検証**: 入力時の即座なバリデーション
- **日本語対応**: ひらがな→カタカナ自動変換
- **電話番号フォーマット**: 自動ハイフン挿入
- **データ保存**: LocalStorageでの自動保存機能
- **アクセシビリティ**: スクリーンリーダー完全対応

### FAQ アコーディオン
- **単一展開**: 一度に一つのアイテムのみ展開
- **キーボード操作**: Enter/Spaceキーで開閉
- **アニメーション**: スムーズな展開・収縮
- **印刷対応**: 印刷時は全項目展開

### スムーススクロール
- **アンカーリンク**: ページ内リンクのスムーズスクロール
- **ヘッダー考慮**: 固定ヘッダーのオフセット計算
- **フォーカス管理**: スクロール後の適切なフォーカス移動

## ♿ アクセシビリティ機能

### WCAG 2.1 AA準拠
- [x] **カラーコントラスト**: 4.5:1以上の比率確保
- [x] **キーボードナビゲーション**: 全機能へのキーボードアクセス
- [x] **スクリーンリーダー**: 完全対応実装
- [x] **フォーカス表示**: 明確な視覚的フィードバック

### 実装されたアクセシビリティ機能
1. **セマンティックHTML**: 適切な見出し階層と landmark要素
2. **ARIAラベル**: 複雑なUI要素の説明
3. **Live Regions**: 動的コンテンツの変更通知
4. **スキップリンク**: メインコンテンツへの直接移動
5. **代替テキスト**: 全画像への適切なalt属性

## 🔍 SEO最適化

### 実装済みSEO施策
1. **構造化データ**: LocalBusiness、FAQPageのschema.org実装
2. **メタタグ最適化**: 各ページ固有のtitle、description
3. **OGPタグ**: ソーシャルメディア共有最適化
4. **サイトマップ**: XML sitemap自動生成
5. **セマンティックマークアップ**: 検索エンジン理解促進

### SEOチェックリスト
- [x] ページタイトル最適化（32文字以内）
- [x] メタディスクリプション（120文字以内）
- [x] 見出しタグ階層（H1-H6適切使用）
- [x] 画像alt属性設定
- [x] 内部リンク構造最適化
- [x] ページ読み込み速度最適化

## 🛠️ 運用・更新方法

### コンテンツ更新
1. **新着情報の追加**:
   - `index.html`の`.news__list`セクションを編集
   - 日付形式: `YYYY.MM.DD`

2. **スタッフ情報の更新**:
   - `about.html`の`.staff__grid`セクションを編集
   - 画像は`images/`フォルダに追加

3. **サービス内容の変更**:
   - 各ページの該当セクションを編集
   - CSS クラス名を維持して一貫性を保持

### 画像の追加・更新
1. **推奨画像フォーマット**: JPEG（写真）、SVG（アイコン）、PNG（透明背景）
2. **最適化**: 圧縮ツールで最適化後アップロード
3. **レスポンシブ対応**: 複数サイズの画像準備を推奨
4. **alt属性**: 必ず適切な代替テキストを設定

### CSS・JavaScript更新
1. **CSS変更**: `css/style.css`を編集
2. **機能追加**: `js/main.js`または`js/form.js`を編集
3. **バージョン管理**: 変更前にバックアップを作成
4. **ブラウザキャッシュ**: 更新後にクエリパラメータを追加（例: `style.css?v=1.1`）

### セキュリティメンテナンス
1. **定期的な更新確認**: セキュリティパッチの適用
2. **バックアップ**: 定期的なファイル・データバックアップ
3. **アクセスログ**: 不審なアクセスの監視
4. **SSL証明書**: 期限前の更新

## 📊 パフォーマンス最適化

### 実装済み最適化
1. **CSS最適化**: カスタムプロパティとモダンCSS使用
2. **JavaScript最適化**: ES6+による効率的な実装
3. **画像最適化**: 遅延読み込み対応コード実装
4. **キャッシュ戦略**: HTTPヘッダーによるキャッシュ制御
5. **圧縮**: Gzip圧縮有効化

### パフォーマンス目標値
- **First Contentful Paint**: < 2 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Total Blocking Time**: < 300ms
- **Cumulative Layout Shift**: < 0.1

### 追加最適化推奨事項
1. **画像WebP形式**: 対応ブラウザでのWebP使用
2. **CDN導入**: 静的ファイルのCDN配信
3. **Critical CSS**: Above-the-fold CSS インライン化
4. **Service Worker**: オフライン対応とキャッシュ戦略

## 🧪 テスト・検証

### 必須テスト項目
1. **アクセシビリティテスト**:
   - Lighthouse Accessibility Audit
   - WAVE Web Accessibility Evaluation
   - axe DevTools による検証

2. **レスポンシブテスト**:
   - 各ブレークポイントでの表示確認
   - 実機での動作テスト
   - タッチ操作の検証

3. **ブラウザ互換性テスト**:
   - 対応ブラウザでの動作確認
   - 古いブラウザでの基本機能確認

4. **パフォーマンステスト**:
   - PageSpeed Insights による測定
   - GTmetrix による詳細分析

### テストツール
- **自動化ツール**: Lighthouse、axe、WAVE
- **手動テスト**: スクリーンリーダー、キーボードナビゲーション
- **パフォーマンス**: Google PageSpeed Insights、GTmetrix

## 🚨 トラブルシューティング

### よくある問題と解決方法

#### 1. CSS/JavaScriptが読み込まれない
**原因**: ファイルパスの間違い、キャッシュ
**解決方法**:
- ファイルパスを確認
- ブラウザキャッシュをクリア
- サーバーのファイル権限を確認

#### 2. モバイルで表示が崩れる
**原因**: viewport設定、CSS メディアクエリ
**解決方法**:
- `<meta name="viewport">` タグを確認
- CSS のブレークポイントを調整

#### 3. フォームが送信されない
**原因**: JavaScript エラー、サーバー設定
**解決方法**:
- ブラウザの開発者ツールでエラー確認
- フォームアクション先の設定確認
- CORS設定の確認

#### 4. アクセシビリティの問題
**原因**: セマンティックHTML、ARIA属性の不備
**解決方法**:
- HTMLバリデーターで構文確認
- axe DevToolsで詳細確認
- スクリーンリーダーでテスト

## 📞 サポート・連絡先

### 技術サポート
- **ウェブサイト関連**: 開発チーム
- **サーバー・ドメイン**: ホスティング会社
- **SSL証明書**: 証明書発行会社

### 緊急時の対応
1. **サイトダウン**: ホスティング会社に連絡
2. **セキュリティ問題**: 即座にサイト停止、専門家に相談
3. **データ消失**: バックアップからの復旧

## 📚 参考資料

### Web標準・アクセシビリティ
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [JIS X 8341](https://www.jisc.go.jp/app/jis/general/GnrJISNumberNameSearchList?show&jisStdNo=X8341)

### パフォーマンス
- [Web Vitals](https://web.dev/vitals/)
- [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

### SEO
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)

---

## 📝 ライセンス

このプロジェクトは株式会社とんとんの所有物です。無断での複製、配布、使用を禁じます。

## 🔄 更新履歴

- **v1.0.0** (2024-01-15): 初期リリース
  - 基本サイト構築
  - レスポンシブデザイン実装
  - アクセシビリティ対応
  - SEO最適化# taka2929029.github.io
