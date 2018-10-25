﻿/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import {Live2DCubismFramework as cubismjson} from '../utils/cubismjson';
import {Live2DCubismFramework as cubismvector2} from '../math/cubismvector2';
import {Live2DCubismFramework as cubismid} from '../id/cubismid';
import {Live2DCubismFramework as cubismframework} from '../live2dcubismframework';
import CubismFramework = cubismframework.CubismFramework;
import CubismIdHandle = cubismid.CubismIdHandle;
import CubismVector2 = cubismvector2.CubismVector2;
import CubismJson = cubismjson.CubismJson;

export namespace Live2DCubismFramework
{
    // JSON keys
    const Position: string = "Position";
    const X: string = "X";
    const Y: string = "Y";
    const Angle: string = "Angle";
    const Type: string = "Type";
    const Id: string = "Id";

    // Meta
    const Meta: string = "Meta";
    const EffectiveForces: string = "EffectiveForces";
    const TotalInputCount: string = "TotalInputCount";
    const TotalOutputCount: string = "TotalOutputCount";
    const PhysicsSettingCount: string = "PhysicsSettingCount";
    const Gravity: string = "Gravity";
    const Wind: string = "Wind";
    const VertexCount: string = "VertexCount";

    // PhysicsSettings
    const PhysicsSettings: string = "PhysicsSettings";
    const Normalization: string = "Normalization";
    const Minimum: string = "Minimum";
    const Maximum: string = "Maximum";
    const Default: string = "Default";
    const Reflect: string = "Reflect";
    const Weight: string = "Weight";

    // Input
    const Input: string = "Input";
    const Source: string = "Source";

    // Output
    const Output: string = "Output";
    const Scale: string = "Scale";
    const VertexIndex: string = "VertexIndex";
    const Destination: string = "Destination";

    // Particle
    const Vertices: string = "Vertices";
    const Mobility: string = "Mobility";
    const Delay: string = "Delay";
    const Radius: string = "Radius";
    const Acceleration: string = "Acceleration";

    /**
     * physics3.jsonのコンテナ。
     */
    export class CubismPhysicsJson
    {
        /**
         * コンストラクタ
         * @param buffer physics3.jsonが読み込まれているバッファ
         * @param size バッファのサイズ
         */
        public constructor(buffer: ArrayBuffer, size: number)
        {
            this._json = CubismJson.create(buffer, size);
        }

        /**
         * デストラクタ相当の処理
         */
        public release(): void
        {
            CubismJson.delete(this._json);
        }

        /**
         * 重力の取得
         * @return 重力
         */
        public getGravity(): CubismVector2
        {
            let ret: CubismVector2 = new CubismVector2(0, 0);
            ret.x = this._json.getRoot().getMap().getValue(Meta).getMap().getValue(EffectiveForces).getMap().getValue(Gravity).getMap().getValue(X).toFloat();
            ret.y = this._json.getRoot().getMap().getValue(Meta).getMap().getValue(EffectiveForces).getMap().getValue(Gravity).getMap().getValue(Y).toFloat();
            return ret;
        }

        /**
         * 風の取得
         * @return 風
         */
        public getWind(): CubismVector2
        {
            let ret: CubismVector2 = new CubismVector2(0, 0);
            ret.x = this._json.getRoot().getMap().getValue(Meta).getMap().getValue(EffectiveForces).getMap().getValue(Wind).getMap().getValue(X).toFloat();
            ret.y = this._json.getRoot().getMap().getValue(Meta).getMap().getValue(EffectiveForces).getMap().getValue(Wind).getMap().getValue(Y).toFloat();
            return ret;
        }

        /**
         * 物理店の管理の個数の取得
         * @return 物理店の管理の個数
         */
        public getSubRigCount(): number
        {
            return this._json.getRoot().getMap().getValue(Meta).getMap().getValue(PhysicsSettingCount).toInt();
        }
        
        /**
         * 入力の総合計の取得
         * @return 入力の総合計
         */
        public getTotalInputCount(): number
        {
            return this._json.getRoot().getMap().getValue(Meta).getMap().getValue(TotalInputCount).toInt();
        }

        /**
         * 出力の総合計の取得
         * @return 出力の総合計
         */
        public getTotalOutputCount(): number
        {
            return this._json.getRoot().getMap().getValue(Meta).getMap().getValue(TotalOutputCount).toInt();
        }

        /**
         * 物理点の個数の取得
         * @return 物理点の個数
         */
        public getVertexCount(): number
        {
            return this._json.getRoot().getMap().getValue(Meta).getMap().getValue(VertexCount).toInt();
        }
        
        /**
         * 正規化された位置の最小値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置の最小値
         */
        public getNormalizationPositionMinimumValue(physicsSettingIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Normalization).getMap().getValue(Position).getMap().getValue(Minimum).toFloat();
        }

        /**
         * 正規化された位置の最大値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置の最大値
         */
        public getNormalizationPositionMaximumValue(physicsSettingIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Normalization).getMap().getValue(Position).getMap().getValue(Maximum).toFloat();
        }

        /**
         * 正規化された位置のデフォルト値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された位置のデフォルト値
         */
        public getNormalizationPositionDefaultValue(physicsSettingIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Normalization).getMap().getValue(Position).getMap().getValue(Default).toFloat();
        }

        /**
         * 正規化された角度の最小値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された角度の最小値
         */
        public getNormalizationAngleMinimumValue(physicsSettingIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Normalization).getMap().getValue(Angle).getMap().getValue(Minimum).toFloat();
        }

        /**
         * 正規化された角度の最大値の取得
         * @param physicsSettingIndex
         * @return 正規化された角度の最大値
         */
        public getNormalizationAngleMaximumValue(physicsSettingIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Normalization).getMap().getValue(Angle).getMap().getValue(Maximum).toFloat();
        }

        /**
         * 正規化された角度のデフォルト値の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 正規化された角度のデフォルト値
         */
        public getNormalizationAngleDefaultValue(physicsSettingIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Normalization).getMap().getValue(Angle).getMap().getValue(Default).toFloat();
        }

        /**
         * 入力の個数の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 入力の個数
         */
        public getInputCount(physicsSettingIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Input).getVector().getSize();
        }

        /**
         * 入力の重みの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の重み
         */
        public getInputWeight(physicsSettingIndex: number, inputIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Input).getVector().at(inputIndex).getMap().getValue(Weight).toFloat();
        }

        /**
         * 入力の反転の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の反転
         */
        public getInputReflect(physicsSettingIndex: number, inputIndex: number): boolean
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Input).getVector().at(inputIndex).getMap().getValue(Reflect).toBoolean();
        }

        /**
         * 入力の種類の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力の種類
         */
        public getInputType(physicsSettingIndex: number, inputIndex: number): string
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Input).getVector().at(inputIndex).getMap().getValue(Type).getRawString();
        }

        /**
         * 入力元のIDの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param inputIndex 入力のインデックス
         * @return 入力元のID
         */
        public getInputSourceId(physicsSettingIndex: number, inputIndex: number): CubismIdHandle
        {
            return CubismFramework.getIdManager().getId(this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Input).getVector().at(inputIndex).getMap().getValue(Source).getMap().getValue(Id).getRawString());
        }

        /**
         * 出力の個数の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @return 出力の個数
         */
        public getOutputCount(physicsSettingIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Output).getVector().getSize();
        }

        /**
         * 出力の物理点のインデックスの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の物理点のインデックス
         */
        public getOutputVertexIndex(physicsSettingIndex: number, outputIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Output).getVector().at(outputIndex).getMap().getValue(VertexIndex).toInt();
        }

        /**
         * 出力の角度のスケールを取得する
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の角度のスケール
         */
        public getOutputAngleScale(physicsSettingIndex: number, outputIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Output).getVector().at(outputIndex).getMap().getValue(Scale).toFloat();
        }

        /**
         * 出力の重みの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の重み
         */
        public getOutputWeight(physicsSettingIndex: number, outputIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Output).getVector().at(outputIndex).getMap().getValue(Weight).toFloat();
        }

        /**
         * 出力先のIDの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex　出力のインデックス
         * @return 出力先のID
         */
        public getOutputDestinationId(physicsSettingIndex: number, outputIndex: number): CubismIdHandle
        {
            return CubismFramework.getIdManager().getId(this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Output).getVector().at(outputIndex).getMap().getValue(Destination).getMap().getValue(Id).getRawString());
        }

        /**
         * 出力の種類の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の種類
         */
        public getOutputType(physicsSettingIndex: number, outputIndex: number): string
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Output).getVector().at(outputIndex).getMap().getValue(Type).getRawString();
        }

        /**
         * 出力の反転の取得
         * @param physicsSettingIndex 物理演算のインデックス
         * @param outputIndex 出力のインデックス
         * @return 出力の反転
         */
        public getOutputReflect(physicsSettingIndex: number, outputIndex: number): boolean
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Output).getVector().at(outputIndex).getMap().getValue(Reflect).toBoolean();
        }

        /**
         * 物理点の個数の取得
         * @param physicsSettingIndex 物理演算男設定のインデックス
         * @return 物理点の個数
         */
        public getParticleCount(physicsSettingIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Vertices).getVector().getSize();
        }

        /**
         * 物理点の動きやすさの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の動きやすさ
         */
        public getParticleMobility(physicsSettingIndex: number, vertexIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Vertices).getVector().at(vertexIndex).getMap().getValue(Mobility).toFloat();
        }

        /**
         * 物理点の遅れの取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の遅れ
         */
        public getParticleDelay(physicsSettingIndex: number, vertexIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Vertices).getVector().at(vertexIndex).getMap().getValue(Delay).toFloat();
        }

        /**
         * 物理点の加速度の取得
         * @param physicsSettingIndex 物理演算の設定
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の加速度
         */
        public getParticleAcceleration(physicsSettingIndex: number, vertexIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Vertices).getVector().at(vertexIndex).getMap().getValue(Acceleration).toFloat();
        }

        /**
         * 物理点の距離の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexIndex 物理点のインデックス
         * @return 物理点の距離
         */
        public getParticleRadius(physicsSettingIndex: number, vertexIndex: number): number
        {
            return this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Vertices).getVector().at(vertexIndex).getMap().getValue(Radius).toInt();
        }

        /**
         * 物理点の位置の取得
         * @param physicsSettingIndex 物理演算の設定のインデックス
         * @param vertexInde 物理点のインデックス
         * @return 物理点の位置
         */
        public getParticlePosition(physicsSettingIndex: number, vertexIndex: number): CubismVector2
        {
            let ret: CubismVector2 = new CubismVector2(0, 0);
            ret.x = this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Vertices).getVector().at(vertexIndex).getMap().getValue(Position).getMap().getValue(X).toFloat();
            ret.y = this._json.getRoot().getMap().getValue(PhysicsSettings).getVector().at(physicsSettingIndex).getMap().getValue(Vertices).getVector().at(vertexIndex).getMap().getValue(Position).getMap().getValue(Y).toFloat();
            return ret;
        }

        _json: CubismJson;  // physics3.jsonデータ
    }

}