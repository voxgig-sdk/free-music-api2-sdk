# FreeMusicApi2 SDK utility: feature_add
module FreeMusicApi2Utilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
